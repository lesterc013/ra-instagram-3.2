import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

const Post = ({ messageItem, handleUpdate }) => {
  const [likeButton, setLikeButton] = useState(true)

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
    </Card>
  )
}

export default Post
