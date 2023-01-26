import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { Socket } from 'socket.io-client'
import { IUser } from '../../models/user'

export const Home = ({ socket }: { socket: Socket }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [recipient, setRecipient] = useState<string>('')
  const [recipients, setRecipients] = useState<{ name: string; _id: string }[]>([])
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    socket.on('signInResponse', (data) => setUser(data))
    socket.on('selectUserResponse', (data) => {
      console.log('selectUserResponse: ', data)
      setRecipients(data)
    })
    socket.on('messageResponse', (data) => {
      if (user) {
        const newMails = [...user.mails, data]
        setUser({ ...user, mails: newMails })
      }
    })
  }, [socket, user])

  const handleChangeRecipient = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value.trim())

    socket.emit('selectUser', { partName: recipient })
  }
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleChangeBody = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (user && recipient && title && body) {
      const newMail = {
        from: user.name,
        to: recipient,
        title,
        body,
      }

      socket.emit('message', { newMail })
      event.currentTarget.reset()
    }
  }

  const handleClickOnDropdownItem = (item: string) => {
    setRecipient(item)
    setRecipients([])
  }

  return (
    <>
      <h4 className='text-center'>{`Your name: ${user?.name}`}</h4>
      <Form className='w-100' onSubmit={handleSubmit}>
        <Form.Group className='mb-2'>
          <Form.Label>Recipient</Form.Label>
          <Form.Control
            type='text'
            value={recipient}
            onChange={handleChangeRecipient}
            placeholder='Enter recipient name'
          />
        </Form.Group>
        <Dropdown show={!!recipients.length}>
          <Dropdown.Menu>
            {recipients.map((recip) => (
              <Dropdown.Item
                as='button'
                key={recip._id}
                onClick={() => handleClickOnDropdownItem(recip.name)}
                eventKey={recip.name}
              >
                {recip.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Group className='mb-2'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            onChange={handleChangeTitle}
            placeholder='Enter title'
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Message body</Form.Label>
          <Form.Control
            as='textarea'
            value={body}
            onChange={handleChangeBody}
            placeholder='Enter message body'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Send Message
        </Button>
      </Form>
      {user && (
        <>
          <div>
            {user.mails.map((mail, ind) => (
              <div key={ind}>
                <div>{mail.from}</div>
                <div>{mail.to}</div>
                <div>{mail.title}</div>
                <div>{mail.body}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
