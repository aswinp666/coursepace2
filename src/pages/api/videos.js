import { Storage } from '@google-cloud/storage'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEYFILE,
})

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Make sure ./tmp directory exists
    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir)
    }

    const form = formidable({
      uploadDir: tmpDir,
      keepExtensions: true,
    })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err)
        return res.status(500).json({ error: 'File upload failed', details: err })
      }

      const uploadedFile = files.file[0]
      const filePath = uploadedFile.filepath
      const fileName = uploadedFile.originalFilename

      try {
        await bucket.upload(filePath, {
          destination: fileName,
        })

        fs.unlinkSync(filePath)

        return res.status(200).json({ message: 'File uploaded successfully', fileName })
      } catch (uploadError) {
        console.error('Upload error:', uploadError)
        return res.status(500).json({ error: 'Error uploading file', details: uploadError })
      }
    })
  } else if (req.method === 'DELETE') {
    const { fileName } = req.query
    try {
      await bucket.file(fileName).delete()
      return res.status(200).json({ message: 'File deleted successfully' })
    } catch (deleteError) {
      console.error('Delete error:', deleteError)
      return res.status(500).json({ error: 'Error deleting file', details: deleteError })
    }
  } else if (req.method === 'GET') {
    try {
      const [files] = await bucket.getFiles()

      const videos = files.map((file) => ({
        name: file.name,
        url: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
      }))

      return res.status(200).json(videos)
    } catch (listError) {
      console.error('List error:', listError)
      return res.status(500).json({ error: 'Error listing videos', details: listError })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
