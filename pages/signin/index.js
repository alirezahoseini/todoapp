import Link from 'next/link'
import React, { useState } from 'react'

function signin() {
  const [formValue, setFormVlues] = useState({
    name: "",
    email: "",
    password: ""
  })
  return (
    <div className='flex flex-col items-center justify-center lg:w-1/2 lg:mx-auto mt-5 p-3'>
      <h2 className="text-xl font-bold text-white  my-4">Login account</h2>
      <form className='flex flex-col w-full items-center gap-3 mt-3 ' >
        <input type="email" placeholder="Email" name='email' className="input input-bordered w-full" required />
        <input type="password" placeholder="Password" name='password' className="input input-bordered w-full" required />
        <div className='flex items-center gap-3 w-full justify-center p-1'>
          <button className='btn btn-active btn-primary text-white w-1/2'>Submit</button>
          <button className='btn btn-active btn-neutral text-white w-1/2'>Log in as a guest</button>
        </div>
        <Link className='text-blue-400 font-medium mt-2' href={'/signup'}>Dont have a account? Signup</Link>
      </form>
    </div>
  )
}

export default signin