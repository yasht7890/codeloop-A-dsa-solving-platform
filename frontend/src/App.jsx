import React, { useEffect } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import { Toaster } from "react-hot-toast";



import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import Layout from './components/Layout.jsx';
import AdminRoute from './components/AdminRoute.jsx'
import AddProblem from './Pages/AddProblem.jsx';
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
   useEffect(() => {
    checkAuth();
  }, [checkAuth]);

   if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (


    <div className='flex flex-col items-center justify-start'>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route 
        path='/login'
        element={!authUser ? <LoginPage /> : <Navigate to={"/"}/> }
        />

        <Route 
        path='/signuP'
        element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App