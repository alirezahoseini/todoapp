import React from 'react'

function TaskList() {
    return (
        <div className='mt-3 p-2 w-full rounded-lg'>
            <h2 className='font-bold text-lg text-center'>My taks ✅</h2>
            <div>
                <div className="form-control flex-row w-full items-center">
                    <span className=''>Go to gym</span>
                    <div className='flex items-center gap-4 ml-auto'>
                        <span className='bg-red-600 p-1 rounded-md bg-opacity-35 cursor-pointer'>
                            <img src="./images/Trash.svg" alt="" />
                        </span>
                        <label className="cursor-pointer label">
                            <input type="checkbox" defaultChecked className="checkbox checkbox-accent checkbox-lg" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskList