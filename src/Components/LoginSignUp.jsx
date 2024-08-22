import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginSignUp = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLoginSignUp,
}) => {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address </Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password </Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant='primary'
        type='button'
        onClick={() => handleLoginSignUp(email, password)}
      >
        Login/Sign Up
      </Button>
    </Form>
  )
}

export default LoginSignUp
