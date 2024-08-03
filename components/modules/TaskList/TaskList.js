import React from 'react'

function TaskList() {
    return (
        <div className='mt-3 p-2 w-full rounded-lg'>
            <h2 className='font-bold text-lg text-center'>My taks ✅</h2>
            <ul>
                <li className="form-control flex-row w-full items-center">
                    <label className="cursor-pointer label">
                        <input type="checkbox" defaultChecked className="checkbox checkbox-accent" />
                    </label>
                    <span className='ml-3'>Go to gym</span>
                    <span className='bg-red-600 p-1 rounded-md bg-opacity-35 cursor-pointer ml-auto'>
                        <img src="./images/Trash.svg" alt="" />
                    </span>
                </li>
            </ul>

        </div>
    )
}

export default TaskList