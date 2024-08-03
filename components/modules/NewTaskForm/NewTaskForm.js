import React from 'react'

function NewTaskForm() {
    return (
        <div className=' flex flex-col justify-center items-center my-5 w-full'>
            <h2 className='font-bold text-lg'>New Task</h2>
            <form className='flex w-full items-center gap-3 mt-3 ' >
                <input type="text" placeholder="Type here" className="input input-bordered input-info w-full" />
                <button className='btn btn-primary text-white' type="submit">Add</button>
            </form>
        </div>
    )
}

export default NewTaskForm