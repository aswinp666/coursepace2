// src/interfaces/navigation.ts (ensure this file exists and matches your project)
export interface Navigation {
  label: string
  path: string
}

// src/navigations.ts (or wherever you define navigations)
// import type { Navigation } from './interfaces/navigation'; // Adjust path if necessary

export const navigations: Navigation[] = [
  {
    label: 'Home',
    path: '#', // '/',
  },
  {
    label: 'Video Courses Overview',
    path: 'popular-course', // '/popular-course',
  },
  {
    label: 'Testimonial',
    path: 'testimonial', // '/testimonial',
  },
  {
    label: 'Mentor',
    path: 'mentors', // '/mentors',
  },
  // {
  //   label: 'Wishlist', // New entry for wishlist
  //   path: 'wishlist', // Special path to trigger modal, not a route
  // },
]
