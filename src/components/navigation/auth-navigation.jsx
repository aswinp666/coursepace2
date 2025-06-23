import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import WishlistModal from '../wishlist/wishlist-modal' // Import the modal

// Import the staticCoursesData from availablecourses.js
// Ensure the path is correct based on your project structure.
import { staticCoursesData as allAvailableCourses } from '../../pages/availablecourses' //

const AuthNavigation = () => {
  const [user, setUser] = useState(null)
  const [showWishlistModal, setShowWishlistModal] = useState(false)
  const [wishlistItems, setWishlistItems] = useState([])
  const router = useRouter()

  const loadWishlistItems = () => {
    if (typeof window !== 'undefined') {
      const storedWishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]') //

      // Filter from the correct course data and use the _id property
      const items = allAvailableCourses.filter((course) => storedWishlistIds.includes(course._id.toString())) //
      setWishlistItems(items) //
    }
  }

  // Function to open wishlist modal
  const handleOpenWishlistModal = () => {
    loadWishlistItems() //
    setShowWishlistModal(true) //
  }

  const handleCloseWishlistModal = () => {
    setShowWishlistModal(false) //
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/user', {
          method: 'GET',
          credentials: 'include', //  Send cookies
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()

    // Listener for wishlist updates
    const handleWishlistUpdate = () => {
      if (showWishlistModal) {
        // Only reload if modal is currently open
        loadWishlistItems() //
      }
    }

    window.addEventListener('wishlistUpdated', handleWishlistUpdate) //

    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate) //
    }
  }, [showWishlistModal]) // Add showWishlistModal to dependencies to re-evaluate listener if modal state changes

  const handleLogout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include', // 🔥 Send cookies
    })

    setUser(null)
    router.push('/signin') // Redirect to SignIn
  }

  return (
    <nav>
      {user ? (
        <>
          {/* Wishlist Modal Component */}
          <WishlistModal open={showWishlistModal} onClose={handleCloseWishlistModal} courses={wishlistItems} />

          <span>Welcome, {user.email}</span>
          <button
            onClick={handleOpenWishlistModal} //
            style={{
              backgroundColor: '#55CDBA', // A different color for distinction
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              marginLeft: '10px',
            }}
          >
            Wishlist
          </button>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#127C71',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              marginLeft: '10px',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push('/signin')}
            style={{
              backgroundColor: '#127C71',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#127C71')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#127C71')}
          >
            Sign In
          </button>

          <button
            onClick={() => router.push('/signup')}
            style={{
              backgroundColor: '#127C71',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              marginLeft: '10px',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#127C71')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#127C71')}
          >
            Sign Up
          </button>
        </>
      )}
    </nav>
  )
}

export default AuthNavigation
