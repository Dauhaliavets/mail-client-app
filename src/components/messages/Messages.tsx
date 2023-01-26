import React, { useContext } from 'react'
import { Accordion, Col, Container, Image, Row } from 'react-bootstrap'
import { Context } from '../../context/context'
import LeftArrowIcon from '../../assets/arrow_left_red_icon.png'
import RightArrowIcon from '../../assets/arrow_right_green_icon.png'

export const Messages = () => {
  const { user } = useContext(Context)

  return (
    <>
      {user && (
        <Container>
          <h4 className='text-left'>Mails</h4>
          <Accordion flush>
            {user.mails.map((mail, ind) => (
              <Row key={ind}>
                <Accordion.Item eventKey={`${ind}`} className='p-0'>
                  <Accordion.Header className='p-0'>
                    <Col xs={1}>
                      {user.name === mail.from ? (
                        <Image src={LeftArrowIcon} style={{ height: '24px', width: '24px' }} />
                      ) : (
                        <Image src={RightArrowIcon} style={{ height: '24px', width: '24px' }} />
                      )}
                    </Col>
                    <Col xs={2}>from: {mail.from}</Col>
                    <Col xs={2}>to: {mail.to}</Col>
                    <Col>Title: {mail.title}</Col>
                  </Accordion.Header>
                  <Accordion.Body className='bg-light border border-1 border-top-0 border-opacity-25 border-primary'>
                    <Col>Body: {mail.body}</Col>
                  </Accordion.Body>
                </Accordion.Item>
              </Row>
            ))}
          </Accordion>
        </Container>
      )}
    </>
  )
}
