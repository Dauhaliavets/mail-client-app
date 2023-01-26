import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export const SignIn = ({ socket }: { socket: Socket }) => {
  const [userName, setUserName] = useState<string>('')
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit('signIn', { userName })
    navigate('/home')
  }

  return (
    <Form className='w-75' onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Control
          type='text'
          value={userName}
          onChange={handleChange}
          placeholder='Enter your name'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Sign In
      </Button>
    </Form>
  )
}
