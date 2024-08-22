// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp)

// Export an instance of storage
export const storage = getStorage(firebaseApp)

// Export instance of auth
export const auth = getAuth(firebaseApp)
