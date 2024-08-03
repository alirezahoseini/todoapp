import Link from 'next/link'
import React from 'react'

function signup() {
  return (
    <div className='flex flex-col items-center justify-center lg:w-1/2 lg:mx-auto mt-5 p-3'>
      <h2 className="text-xl font-bold text-white  my-4">Create new account</h2>
      <form className='flex flex-col w-full items-center gap-3 mt-3 ' >
        <input type="text" placeholder="Name" name='name' className="input input-bordered w-full" required />
        <input type="email" placeholder="Email" name='email' className="input input-bordered w-full" required />
        <input type="password" placeholder="Password" name='password' className="input input-bordered w-full" required />
        <button className='btn btn-active btn-primary text-white btn-block'>Submit</button>
        <Link className='text-blue-400 font-medium mt-2' href={'/signin'}>Do you have a account? Signin</Link>
      </form>
    </div>
  )
}

export default signup