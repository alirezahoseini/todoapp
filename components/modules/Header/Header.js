import React from 'react'

function Header() {
  return (
    <div className='flex flex-row p-4 bg-slate-800 items-center justify-between lg:w-1/2 lg:mx-auto lg:mt-2 lg:rounded-md'>
      <h1 className='font-black text-xl'>Todo App</h1>
      <div className='flex items-center gap-3'>
        <h2 className='font-bold'>Hello Alireza 🖐️</h2>
        <button className='btn'>Logout</button>
      </div>
    </div>
  )
}

export default Header