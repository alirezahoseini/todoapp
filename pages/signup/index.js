import Link from 'next/link'
import Input from '@/components/modules/Input/Input';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";

function signup() {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: {
      error: false,
      message: ''
    },
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
    name: false,
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
    const { name, email, password } = formValues
    // validate name
    if (name.trim().length < 3 || name.trim().length > 20) {
      setErrors(perv => {
        return { ...perv, name: { error: true, message: "The name must be more than 3 characters and less than 20" } }
      });
    } else {
      setErrors(perv => {
        return { ...perv, name: { error: false, message: "" } }
      });
    }
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

    if (errors.name.error || errors.email.error || errors.password.error) {
      return false
    } 
    if(!errors.name.error && !errors.email.error && !errors.password.error) {
      return true
    }
  }

  const onFocusHandler = (inputName) => {
    setFocused(perv => {
      return {...perv, [inputName]: true}
    })
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    if (validateFormValues()) {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formValues)
      });
      
      if(res.status === 422){
        alert('Your inputs not valid!');
      }
      if(res.status === 429){
        alert('This Email already exist !!!');
      }
      if(res.status === 201){
        router.push('/')
      }
    }

  }

  return (
    <div className='flex flex-col items-center justify-center lg:w-1/2 lg:mx-auto mt-5 p-3'>
      <h2 className="text-xl font-bold text-white  my-4">Create new account</h2>
      <form onSubmit={submitHandler} className='flex flex-col w-full items-center gap-3 mt-3 ' >
        <Input value={formValues.name} onChangeHandler={onChangeHandler} type="text" placeholder="Name" name='name' error={errors.name} isFocus={focused.name} onFocusChanger={onFocusHandler} />
        <Input value={formValues.email} onChangeHandler={onChangeHandler} type="email" placeholder="Email" name='email' error={errors.email} isFocus={focused.email} onFocusChanger={onFocusHandler} />
        <Input value={formValues.password} onChangeHandler={onChangeHandler} type="password" placeholder="Password" name='password' error={errors.password} isFocus={focused.password} onFocusChanger={onFocusHandler}/>
        <button className='btn btn-active btn-primary text-white btn-block'>Submit</button>
        <Link className='text-blue-400 font-medium mt-2' href={'/signin'}>Do you have a account? Signin</Link>
      </form>
    </div>
  )
}
export default signup


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