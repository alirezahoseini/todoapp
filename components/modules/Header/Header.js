import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Header() {
  const [userName, setUserName] = useState('');
  const router = useRouter()

  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json();
      if (res.status === 422 || res.status === 423) {
        setUserName(null)
      }

      if (res.status === 200) {
        setUserName(data.name)
      }
    } catch (error) {
      console.log('Cannot get user info in Header !!!' , error);
    }

  }
  useEffect(() => {
    getUser()
  }, [router.pathname]);


  return (
    <div className='flex flex-row p-4 bg-slate-800 items-center justify-between lg:w-1/2 lg:mx-auto lg:mt-2 lg:rounded-md'>
      <h1 className='font-black text-xl'>Todo App</h1>
      <div className='flex items-center gap-3'>
        {!userName ? (
          <>
            <div className={`w-28 h-10 rounded-md bg-slate-700 animate-pulse block ${userName === null && "hidden"}`}></div>
          </>
        ) : (
          <>
            <h2 className='font-bold'>Hello {userName} 🖐️</h2>
            <button className='btn'>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header