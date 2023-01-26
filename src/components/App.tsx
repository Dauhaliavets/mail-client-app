import { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
import { BASE_URL } from '../constants/baseUrl'
import { Context } from '../context/context'
import { IUser } from '../models/user'
import { Home } from './home/Home'
import { SignIn } from './signIn/SignIn'

const socket = io(BASE_URL)

function App() {
  const [user, setUser] = useState<IUser | null>(null)

  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          user,
          setUser,
        }}
      >
        <h2 className='px-2 pt-2 d-flex justify-content-center'>Anonymous Mail Client</h2>
        <Container className='px-2 d-flex flex-column justify-content-center align-items-center'>
          <Routes>
            <Route path='/' element={<SignIn socket={socket} />}></Route>
            <Route path='/home' element={<Home socket={socket} />}></Route>
          </Routes>
        </Container>
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App
