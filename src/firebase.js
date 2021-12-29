// Initialize Firebase
const app = initializeApp(firebaseConfig)

import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export function logout() {
  return signOut(auth)
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    let mounted = true
    if (mounted) {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
      return unsub
    }

    return () => (mounted = false)
  }, [currentUser])

  return currentUser
}

export default getFirestore(app)
