import Link from 'next/link'
import Input from '@/components/modules/Input/Input';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";

function signin() {
  const guestInfo = {
    email: 'john@gmail.com',
    password: "1234"
  }
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: ''
    },
    password: {
      error: false,
      message: ''
    }

  });
  const [focused, setFocused] = useState({
    email: false,
    password: false
  })
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    validateFormValues();
  }, [formValues])

  const onChangeHandler = (event) => {
    const value = event.target.value
    setFormValues(prevValues => {
      return { ...prevValues, [event.target.name]: value }
    });
  }
  const validateFormValues = () => {
    const { email, password } = formValues
    // validate Email
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setErrors(perv => {
        return { ...perv, email: { error: true, message: "Plase enter a valid email" } }
      });
    } else {
      setErrors(perv => {
        return { ...perv, email: { error: false, message: "" } }
      });
    }
    // validate Password
    if (password.trim().length < 4 || password.trim().length > 20) {
      setErrors(perv => {
        return { ...perv, password: { error: true, message: "Password must be more than 4 characters and less than 20" } }
      });
    } else {
      setErrors(perv => {
        return { ...perv, password: { error: false, message: "" } }
      });
    }

    if (errors.email.error || errors.password.error) {
      return false
    }
    if (!errors.email.error && !errors.password.error) {
      return true
    }
  }

  const onFocusHandler = (inputName) => {
    setFocused(perv => {
      return { ...perv, [inputName]: true }
    })
  }


  const submitHandler = async (event, guest) => {
    event.preventDefault();
    if (validateFormValues() || guest) {
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: guest ? JSON.stringify(guestInfo) : JSON.stringify(formValues)
      });

      if (res.status === 422) {
        alert('Your inputs not valid!');
      }
      if (res.status === 429) {
        alert('Email or password is wrong !!');
      }
      if (res.status === 404) {
        alert('There is no user with this email !!!');
      }
      if (res.status === 200) {
        alert('Signin Successfully :))')
        router.push('/')
      }
    }
  }
  const guestLoginHandler = (event) => {
    setFormValues(guestInfo)
    setTimeout(() => {
      submitHandler(event, true,)
    }, 1000);
  }

  return (
    <div className='flex flex-col items-center justify-center lg:w-1/2 lg:mx-auto mt-5 p-3'>
      <h2 className="text-xl font-bold text-white  my-4">Login account</h2>
      <form onSubmit={submitHandler} className='flex flex-col w-full items-center gap-3 mt-3 ' >
        <Input value={formValues.email} onChangeHandler={onChangeHandler} type="email" placeholder="Email" name='email' error={errors.email} isFocus={focused.email} onFocusChanger={onFocusHandler} />
        <Input value={formValues.password} onChangeHandler={onChangeHandler} type="password" placeholder="Password" name='password' error={errors.password} isFocus={focused.password} onFocusChanger={onFocusHandler} />
        <div className='flex items-center gap-3 w-full justify-center p-1'>
          <button type='submit' className='btn btn-active btn-primary text-white w-1/2'>Submit</button>
          <button type='submit' onClick={guestLoginHandler} className='btn btn-active btn-neutral text-white w-1/2'>Log in as a guest</button>
        </div>
        <Link className='text-blue-400 font-medium mt-2' href={'/signup'}>Dont have a account? Signup</Link>
      </form>
    </div>
  )
}

export default signin



export async function getServerSideProps(context) {
  connectToDb()
  const { token } = context.req.cookies;

  const payloadToken = verifyToken(token);

  if (payloadToken !== false) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {
      data: ''
    }
  }
}