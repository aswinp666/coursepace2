import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import IconButton, { iconButtonClasses } from '@mui/material/IconButton'
import ArrowForward from '@mui/icons-material/ArrowForward'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder' // For wishlist
import FavoriteIcon from '@mui/icons-material/Favorite' // For wishlisted item
import { Course } from '@/interfaces/course'

interface Props {
  item: Course
}

const CourseCardItem: FC<Props> = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false)

  // Check local storage on mount to see if the item is already wishlisted
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as string[]
    setIsWishlisted(wishlist.includes(item.id.toString()))
  }, [item.id])

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as string[]
    const itemIdStr = item.id.toString()
    const itemIndex = wishlist.indexOf(itemIdStr)

    if (itemIndex > -1) {
      wishlist.splice(itemIndex, 1) // Remove from wishlist
    } else {
      wishlist.push(itemIdStr) // Add to wishlist
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    setIsWishlisted(!isWishlisted)
    // Optionally, dispatch an event or use a global state to update the wishlist modal if it's open
    window.dispatchEvent(new CustomEvent('wishlistUpdated')) //
  }

  return (
    <Box
      sx={{
        px: 1,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
            [`& .${iconButtonClasses.root}`]: {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3,
            mb: 2,
          }}
        >
          <Image src={item.cover} width={760} height={760} alt={'Course ' + item.id} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2, height: 56, overflow: 'hidden', fontSize: '1.2rem' }}>
            {item.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="rating-course" value={item.rating} max={5} sx={{ color: '#ffce31', mr: 1 }} readOnly />
            <Typography component="span" variant="h5">
              ({item.ratingCount})
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" color="primary.main">
              {'$' + item.price}
            </Typography>
            <Typography variant="h6">/ course</Typography>
          </Box>
          <Box>
            <IconButton
              onClick={handleWishlistToggle}
              color={isWishlisted ? "error" : "default"} // Change color if wishlisted
              sx={{ mr: 1, '&:hover': { backgroundColor: isWishlisted ? 'rgba(255,0,0,0.1)' : 'rgba(0,0,0,0.04)' } }} // Slight background change on hover
            >
              {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton
              color="primary"
              sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseCardItem