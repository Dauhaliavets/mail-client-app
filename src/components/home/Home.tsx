import React, { useContext, useEffect } from 'react'
import { Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { Context } from '../../context/context'
import { MessageForm } from '../messageForm/MessageForm'
import { Messages } from '../messages/Messages'

export const Home = ({ socket }: { socket: Socket }) => {
  const { user, setUser } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('signInResponse', (data) => setUser(data))

    socket.on('messageResponse', (data) => {
      if (user) {
        const newMails = [...user.mails, data]
        setUser({ ...user, mails: newMails })
      }
    })
  }, [socket, user])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) navigate('/')
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [user])

  return (
    <>
      <h4 className='text-center'>
        Your name:{' '}
        <Badge pill bg='primary'>
          {user?.name}
        </Badge>
      </h4>
      <MessageForm socket={socket} />
      <Messages />
    </>
  )
}
