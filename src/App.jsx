import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <div className=''>
        <Manager />
      </div>  
      <Footer />

    </>
  )
}

export default App
