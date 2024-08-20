const Display = ({ messages }) => {
  return (
    <ol>
      {messages.length === 0
        ? null
        : messages.map(messageItem => (
            <li key={messageItem.key}>
              <p>{messageItem.val.username}</p>
              <p>Message: {messageItem.val.message}</p>
              <p>Time: {messageItem.val.time}</p>
              {messageItem.val.imgUrl ? (
                <img
                  src={messageItem.val.imgUrl}
                  alt={`image from ${messageItem.val.username}`}
                />
              ) : (
                <p>No image uploaded</p>
              )}
            </li>
          ))}
    </ol>
  )
}

export default Display
