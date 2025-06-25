import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Removed WishlistModal import

// Import the staticCoursesData from availablecourses.js
// Ensure the path is correct based on your project structure.
// import { staticCoursesData as allAvailableCourses } from '../../pages/availablecourses'; // This import is no longer needed here

const AuthNavigation = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Removed showWishlistModal, setShowWishlistModal, wishlistItems, setWishlistItems states
  // Removed loadWishlistItems, handleOpenWishlistModal, handleCloseWishlistModal functions

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

    // Removed wishlistUpdated event listener logic from here
  }, []) // Removed showWishlistModal from dependencies

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
          {/* Wishlist Modal Component Removed */}
          {/* <WishlistModal open={showWishlistModal} onClose={handleCloseWishlistModal} courses={wishlistItems} /> */}

          <span>Welcome, {user.email}</span>
          <button
            onClick={() => router.push('/wishlist')} // Navigate to /wishlist
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
