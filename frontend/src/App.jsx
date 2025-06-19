import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
const App = () => {
  let authUser = null;
  
  return (


    <div className='flex flex-col items-center justify-start'>
      <Routes>
        <Route 
        path='/'
        element={authUser ? <HomePage /> : <Navigate to={"/login"}/>}
        />
        <Route 
        path='/login'
        element={!authUser ? <LoginPage /> : <Navigate to={"/"}/> }
        />

        <Route 
        path='/signuP'
        element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>}
        />
      </Routes>
    </div>
  )
}

export default App