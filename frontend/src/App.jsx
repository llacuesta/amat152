import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-900 h-screen w-full flex flex-col gap-2 justify-center items-center'>
      <div className='h-10 w-10 bg-red-500 hover:bg-green-300 transition-all rounded-lg shadow-none hover:scale-150'>
      </div>
      <button className='btn btn-primary' onClick={() => alert("Button clicked!")}>
        Click Me!
      </button>
    </div>
  )
}

export default App
