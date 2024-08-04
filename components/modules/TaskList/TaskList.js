import React from 'react'

function TaskList({ todos, changeHandler, deleteHandler }) {
  
    return (
        <div className='mt-3 p-2 w-full rounded-lg'>
            <h2 className='font-bold text-lg text-center'>My taks ✅</h2>
            <ul>
                {todos ? (
                    todos.map(todo => (
                        <li key={todo._id} className="form-control flex-row w-full items-center my-4">
                            <label className="cursor-pointer label">
                                <input type="checkbox" checked={todo.isComplated} onChange={()=> changeHandler(todo._id, !todo.isComplated)} className="checkbox checkbox-accent" />
                            </label>
                            <span className='ml-3'>{todo.title}</span>
                            <span onClick={() => deleteHandler(todo._id)} className='bg-red-600 p-1 rounded-md bg-opacity-35 cursor-pointer ml-auto'>
                                <img src="./images/Trash.svg" alt="" />
                            </span>
                        </li>
                    ))
                ) : (
                    <p>Nothing to show</p>
                )}
            </ul>

        </div>
    )
}

export default TaskList