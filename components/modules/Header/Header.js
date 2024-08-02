import React from 'react'

function Header() {
  return (
    <div className='flex flex-row p-4 bg-slate-800 items-center justify-between'>
      <h1 className='font-black text-xl'>Todo App</h1>
      <div className='flex items-center gap-3'>
        <h2 className='font-bold'>Hello Alireza 🖐️</h2>
        <button className="btn btn-primary text-white">New task</button>
      </div>
    </div>
  )
}

export default Header