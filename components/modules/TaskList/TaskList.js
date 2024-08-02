import React from 'react'

function TaskList() {
    return (
        <div className='mt-3 p-2 w-full rounded-lg'>
            <h2 className='font-bold text-lg text-center'>My taks ✅</h2>
            <div>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text text-base  line-through">Remember me</span>
                        <input type="checkbox" defaultChecked className="checkbox checkbox-accent" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text text-base">Remember me</span>
                        <input type="checkbox" defaultChecked className="checkbox checkbox-accent" />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default TaskList