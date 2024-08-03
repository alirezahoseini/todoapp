import React from 'react'

function Input({value, onChangeHandler, type, placeholder, name, error, isFocus, onFocusChanger}) {
  return (
    <>
    <input onBlur={() => onFocusChanger(name)} value={value} onChange={event => onChangeHandler(event)} type={type} placeholder={placeholder} name={name} className={`input w-full ${error.error && isFocus ? "input-error" : "input-bordered"}`} autoComplete={'true'} required />
    {error && isFocus && (
        <span className='text-red-500 text-left font-semibold text-base'>{error.message}</span>
    )}
    </>
  )
}

export default Input