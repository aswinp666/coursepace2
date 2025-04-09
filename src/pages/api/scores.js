import Score from '../../components/models/Score'
import connectDB from '../../../db'

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'POST') {
    const { quizuserName, score, totalQuestions, percentage, categories } = req.body

    if (!quizuserName || typeof score !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data: quizuserName and score are required',
      })
    }

    try {
      const newScore = await Score.create({
        quizuserName,
        score,
        totalQuestions,
        percentage,
        categories,
      })

      return res.status(201).json({ success: true, data: newScore })
    } catch (error) {
      console.error('Error saving score:', error)
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  if (req.method === 'GET') {
    try {
      const scores = await Score.find().sort({ percentage: -1, date: -1 }).limit(20)
      return res.status(200).json({ success: true, data: scores })
    } catch (error) {
      console.error('Error fetching scores:', error)
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' })
}
