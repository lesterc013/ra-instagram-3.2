import logo from '/logo.png'
import './App.css'
import { auth, database, storage } from './firebase'
import {
  get,
  onChildAdded,
  onChildChanged,
  push,
  ref,
  set,
  update,
} from 'firebase/database'
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from 'firebase/storage'
import { useState, useEffect } from 'react'
import Composer from './Components/Composer'
import Display from './Components/Display'
import LoginSignUp from './Components/LoginSignUp'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = 'messages'
const STORAGE_KEY = '/images'

function App() {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [clickedLoginSignUp, setClickedLoginSignUp] = useState(false)

  useEffect(() => {
    const messagesRef = ref(database, DB_MESSAGES_KEY)
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, data => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      setMessages(prevState =>
        // Store message key so we can use it as a key in our list items when rendering messages
        [...prevState, { key: data.key, val: data.val() }]
      )
    })

    onChildChanged(messagesRef, data => {
      setMessages(prevState =>
        prevState.map(messageItem =>
          messageItem.key === data.key
            ? { key: data.key, val: data.val() }
            : messageItem
        )
      )
    })

    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)
        setLoggedIn(true)
      } else {
        console.log('no user signed in')
        setLoggedIn(false)
      }
    })
  }, [])

  // When someone submits a post, need to first store the image in storage; then store the url in database
  const handleSubmit = event => {
    event.preventDefault()
    if (file) {
      const fullStorageRef = storageRef(storage, STORAGE_KEY + file.name)
      // uploadBytes actually returns an UploadFile object but we have no use for that - we are more interested in calling getDownloadURL if uploadBytes fulfills
      // So that we can write to the db (writeData) and store the imgUrl to display
      uploadBytes(fullStorageRef, file)
        .then(() => {
          getDownloadURL(fullStorageRef)
            .then(imgUrl => {
              writeData(imgUrl)
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    } else {
      writeData(null)
    }

    setUsername('')
    setMessage('')
    setFile(null)
  }

  const writeData = imgUrl => {
    const messageListRef = ref(database, DB_MESSAGES_KEY)
    const newMessageRef = push(messageListRef)
    set(newMessageRef, {
      username,
      message,
      time: new Date().toLocaleString(),
      imgUrl,
      likes: 0,
    })
  }

  const handleUpdate = (key, like) => {
    // Create a ref to the post we want to update
    const postRef = ref(database, `${DB_MESSAGES_KEY}/${key}`)

    // Get the latest snapshot, and then update the post with all the all values and the new likes
    get(postRef).then(snapshot => {
      update(postRef, {
        ...snapshot.val(),
        likes: snapshot.val().likes + like,
      })
    })
  }

  const handleLoginSignUp = async (email, password) => {
    console.log('email', email)
    console.log('password', password)
    let errorCode = null
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(userCredential)
    } catch (error) {
      console.log('error code', error.code)
      errorCode = error.code
      console.log('error message', error.message)
    }

    if (errorCode === 'auth/email-already-in-use') {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log(userCredential)
      } catch (error) {
        console.log('error code', error.code)
        console.log('error message', error.message)
      }
    }
  }

  const conditionalRendering = () => {
    if (!loggedIn && !clickedLoginSignUp) {
      return (
        <div>
          <button onClick={() => setClickedLoginSignUp(true)}>
            Create Account/Login
          </button>
          <Display messages={messages} handleUpdate={handleUpdate} />
        </div>
      )
    }

    if (!loggedIn && clickedLoginSignUp) {
      return (
        <div>
          <LoginSignUp
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLoginSignUp={handleLoginSignUp}
          />
        </div>
      )
    }

    if (loggedIn) {
      return (
        <div>
          <Composer
            writeData={writeData}
            username={username}
            setUsername={setUsername}
            message={message}
            setMessage={setMessage}
            setFile={setFile}
            handleSubmit={handleSubmit}
          />
          <Display messages={messages} handleUpdate={handleUpdate} />
        </div>
      )
    }
  }

  return (
    <>
      <div>
        <img src={logo} className='logo' alt='Rocket logo' />
      </div>
      <h1>Instagram Bootcamp</h1>
      <div className='card'>{conditionalRendering()}</div>
    </>
  )
}

export default App
