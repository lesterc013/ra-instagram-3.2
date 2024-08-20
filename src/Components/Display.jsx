import Post from './Post'

const Display = ({ messages, handleUpdate }) => {
  return (
    <div>
      {messages.length === 0
        ? null
        : messages.map(messageItem => (
            <Post
              key={messageItem.key}
              messageItem={messageItem}
              handleUpdate={handleUpdate}
            />
          ))}
    </div>
  )
}

export default Display
