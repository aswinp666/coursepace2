import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpgi3Z4Cb5Uxas41lag76U1rOSw_Y_L4Q",
  authDomain: "course-1d022.firebaseapp.com",
  projectId: "course-1d022",
  storageBucket: "course-1d022.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "544035365075",
  appId: "1:544035365075:web:2edb351977e5c1c610b426",
  measurementId: "G-60E60YYFNM",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Ensure Analytics only runs in the browser (fixes "window is not defined" error)
export let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}
