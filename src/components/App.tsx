import Container from 'react-bootstrap/esm/Container'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
import { BASE_URL } from '../constants/baseUrl'
import { Home } from './home/Home'
import { SignIn } from './signIn/SignIn'

const socket = io(BASE_URL)

function App() {
  return (
    <BrowserRouter>
      <h2 className='p-2 d-flex justify-content-center'>Anonymous Mail Client</h2>
      <Container className='p-2 d-flex flex-column justify-content-center'>
        <Routes>
          <Route path='/' element={<SignIn socket={socket} />}></Route>
          <Route path='/home' element={<Home socket={socket} />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
