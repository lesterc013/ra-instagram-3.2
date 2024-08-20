const Form = ({
  username,
  setUsername,
  message,
  setMessage,
  setFile,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <br />
      <input
        type='text'
        name='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
      <label>Message</label>
      <br />
      <input
        type='text'
        name='message'
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <br />
      <label>Image</label>
      <br />
      <input
        type='file'
        name='file'
        onChange={e => setFile(e.target.files[0])}
      />
      <br />
      <button type='submit'>Post!</button>
    </form>
  )
}

export default Form
