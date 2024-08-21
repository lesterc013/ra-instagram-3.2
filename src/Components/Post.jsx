import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { database } from '../firebase'
import { ref, get, update } from 'firebase/database'

const DB_MESSAGES_KEY = 'messages'

const Post = ({ messageItem, handleUpdate }) => {
  const [likeButton, setLikeButton] = useState(true)
  const [comment, setComment] = useState('')

  const handleComments = (event, key, comment) => {
    event.preventDefault()
    // Create a ref to the post we want to update
    const postRef = ref(database, `${DB_MESSAGES_KEY}/${key}`)

    // If there are no comments previously, then we instantiate the field with the array
    get(postRef).then(snapshot => {
      snapshot.val().comments
        ? update(postRef, {
            ...snapshot.val(),
            comments: snapshot.val().comments.concat(comment),
          })
        : update(postRef, {
            ...snapshot.val(),
            comments: [comment],
          })
    })
    // Else, we concat the new comment to the array
  }

  // We need this because what is returned from messages.val for comments, is AN OBJECT vs an ARRAY due to firebase's uniqueness. As such, we transform the objects into an array so we can use map later
  const iterateComments = commentsObj => {
    const iterated = []
    for (const idx in commentsObj) {
      iterated.push(commentsObj[idx])
    }
    return iterated
  }

  return (
    <Card>
      <Card.Header as='h2'>{messageItem.val.username}</Card.Header>
      <Card.Body>
        <Card.Text>{messageItem.val.message}</Card.Text>
        <Card.Subtitle className='subtitle'>
          {messageItem.val.time}
        </Card.Subtitle>
      </Card.Body>
      {messageItem.val.imgUrl ? (
        <Card.Img
          src={messageItem.val.imgUrl}
          alt={`image from ${messageItem.val.username}`}
          variant='bottom'
          className='postImg'
        />
      ) : null}
      {likeButton ? (
        <Button
          variant='primary'
          onClick={() => {
            handleUpdate(messageItem.key, 1)
            setLikeButton(!likeButton)
          }}
        >
          Like
        </Button>
      ) : (
        <Button
          variant='primary'
          onClick={() => {
            handleUpdate(messageItem.key, -1)
            setLikeButton(!likeButton)
          }}
        >
          Unlike
        </Button>
      )}
      <Card.Text>{messageItem.val.likes}</Card.Text>
      <form onSubmit={event => handleComments(event, messageItem.key, comment)}>
        <label>Comment: </label>
        <input
          type='text'
          name='comment'
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type='submit'>{'>'}</button>
      </form>
      {messageItem.val.comments
        ? iterateComments(messageItem.val.comments).map(comment => (
            <p>{comment}</p>
          ))
        : null}
    </Card>
  )
}

export default Post
