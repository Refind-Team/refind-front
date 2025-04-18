import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-4xl'>Refind</h1>
      <p className='text-2xl'>Sistema de achados e perdidos</p> 
    </>
  )
}

export default App
