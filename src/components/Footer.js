import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { FaDiscord, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={12} className='text-center'>
            <a href='https://discord.gg/fyy2Ddqd'>
              <FaDiscord color='white' size={24} />
            </a>{' '}
            &nbsp;&nbsp;&nbsp;
            <a href='https://mobile.twitter.com/supbirdsnft'>
              <FaTwitter color='white' size={24} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
