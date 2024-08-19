import logo from '/logo.png'
import './App.css'
import { onChildAdded, push, ref, set } from 'firebase/database'
import { database } from './firebase'
import { useState, useEffect } from 'react'

// Save the Firebase message folder name as a constant to avoid bugs due to misspelling
const DB_MESSAGES_KEY = 'messages'

function App() {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

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
  }, [])

  const writeData = () => {
    const messageListRef = ref(database, DB_MESSAGES_KEY)
    const newMessageRef = push(messageListRef)
    set(newMessageRef, {
      username,
      message,
      time: new Date().toLocaleString(),
    })
  }

  // // Convert messages in state to message JSX elements to render
  // let messageListItems = messages.map(message => (
  //   <li key={message.key}>{message.val}</li>
  // ))

  return (
    <>
      <div>
        <img src={logo} className='logo' alt='Rocket logo' />
      </div>
      <h1>Instagram Bootcamp</h1>
      <div className='card'>
        {/* TODO: Add input field and add text input as messages in Firebase */}
        <form onSubmit={writeData}>
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label>Message</label>
          <input
            type='text'
            name='message'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
        <ol>
          {messages.length === 0
            ? null
            : messages.map(messageItem => (
                <li key={messageItem.key}>
                  <p>{messageItem.val.username}</p>
                  <p>Message: {messageItem.val.message}</p>
                  <p>Time: {messageItem.val.time}</p>
                </li>
              ))}
        </ol>
      </div>
    </>
  )
}

export default App
