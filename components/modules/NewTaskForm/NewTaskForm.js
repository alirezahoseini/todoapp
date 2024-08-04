import React, { useState, useEffect } from 'react'
import Input from '../Input/Input'
import { useRouter } from 'next/router';

function NewTaskForm() {
    const [formValues, setFormValues] = useState({
        title: "",
    });
    const [errors, setErrors] = useState({
        title: {
            error: false,
            message: ''
        },
    });
    const [focused, setFocused] = useState({
        title: false
    })

    useEffect(() => {
        validateFormValues();
    }, [formValues]);
    const router = useRouter();

    const onChangeHandler = (event) => {
        const value = event.target.value
        setFormValues(prevValues => {
            return { ...prevValues, [event.target.name]: value }
        });
    }
    const validateFormValues = () => {
        const { title } = formValues;
        // validate title
        if (title.trim().length < 3 || title.trim().length > 100) {
            setErrors(perv => {
                return { ...perv, title: { error: true, message: "Title must be more than 3 characters and less than 100" } }
            });
        } else {
            setErrors(perv => {
                return { ...perv, title: { error: false, message: "" } }
            });
            return true
        }
    }
    const onFocusHandler = (inputName) => {
        setFocused(perv => {
            return { ...perv, [inputName]: true }
        })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        if (validateFormValues()) {
            const res = await fetch('/api/todos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: formValues.title })
            })
            if (res.status === 423) {
                router.replace('/signin')
            }
            if (res.status === 422) {
                alert('Email or password is wrong !!');
            }
            if (res.status === 404) {
                alert('This request not suported');
            }
            if (res.status === 201) {
                alert('Create todo Successfully :))')
            }
        }

    }

    return (
        <div className=' flex flex-col justify-center items-center my-5 w-full'>
            <h2 className='font-bold text-lg'>New Task</h2>
            <form onSubmit={submitHandler} className='flex w-full items-start gap-3 mt-3 ' >
                <div className='w-full flex flex-col gap-2'><Input value={formValues.title} onChangeHandler={onChangeHandler} type="text" placeholder="Type here" onFocusChanger={onFocusHandler} error={errors.title} name={"title"} isFocus={focused.title} /></div>
                <button className='btn btn-primary text-white' type="submit">Add</button>
            </form>
        </div>
    )
}

export default NewTaskForm