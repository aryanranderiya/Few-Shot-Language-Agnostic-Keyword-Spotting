import { useState } from 'react'
import './App.css'
import { Button } from "./components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='text-foreground min-w-screen min-h-screen flex justify-center items-center flex-col'>

      <h1>Hello World</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </main >
  )
}

export default App
