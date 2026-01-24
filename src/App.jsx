import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Hello!</h1>
      <p>My website is now live 🚀</p>
    </div>
  )
}

export default App
