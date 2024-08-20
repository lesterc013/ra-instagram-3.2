const Form = ({ writeData, username, setUsername, message, setMessage }) => {
  return (
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
  )
}

export default Form
