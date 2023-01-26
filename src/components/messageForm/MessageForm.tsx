import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { Socket } from 'socket.io-client'
import { Context } from '../../context/context'

export const MessageForm = ({ socket }: { socket: Socket }) => {
  const [recipient, setRecipient] = useState<string>('')
  const [recipients, setRecipients] = useState<{ name: string; _id: string }[]>([])
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const { user } = useContext(Context)

  useEffect(() => {
    socket.on('selectUserResponse', (data) => setRecipients(data))
  }, [socket])

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
    <Form className='w-100 mb-2 d-flex flex-column' onSubmit={handleSubmit}>
      <Form.Group className='mb-2'>
        <Form.Label className='mb-0'>Recipient:</Form.Label>
        <Form.Control
          type='text'
          value={recipient}
          onChange={handleChangeRecipient}
          placeholder='Enter recipient name'
        />
      </Form.Group>
      <Dropdown show={!!recipients.length}>
        <Dropdown.Menu className='w-100'>
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
        <Form.Label className='mb-0'>Title:</Form.Label>
        <Form.Control
          type='text'
          value={title}
          onChange={handleChangeTitle}
          placeholder='Enter title'
        />
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label className='mb-0'>Message:</Form.Label>
        <Form.Control
          as='textarea'
          value={body}
          onChange={handleChangeBody}
          placeholder='Enter message'
          style={{ resize: 'none' }}
          rows={3}
        />
      </Form.Group>
      <Button
        className='align-items-end'
        variant='primary'
        type='submit'
        disabled={!recipient || !title || !body}
      >
        Send
      </Button>
    </Form>
  )
}
