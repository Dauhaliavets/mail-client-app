import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Context } from '../../context/context'

export const SignIn = ({ socket }: { socket: Socket }) => {
  const [userName, setUserName] = useState<string>('')
  const { setUser } = useContext(Context)
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    socket.emit('signIn', { userName })
  }

  useEffect(() => {
    socket.on('signInResponse', (data) => {
      setUser(data)
      navigate('/home')
    })
  }, [])

  return (
    <Form className='w-75 d-flex justify-content-around align-items-center' onSubmit={handleSubmit}>
      <Form.Group className='w-75'>
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
