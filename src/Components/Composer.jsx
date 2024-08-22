const Composer = ({ message, setMessage, setFile, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
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

export default Composer
