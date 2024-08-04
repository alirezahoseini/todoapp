import NewTaskForm from "@/components/modules/NewTaskForm/NewTaskForm";
import TaskList from "@/components/modules/TaskList/TaskList";
import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import userModel from '@/models/user'
import todosModel from '@/models/todo'
import { useState } from "react";


export default function MyApp({todos}) {
  const [todoList, setTodosList] = useState([...todos]);
  const changeHandler = async (id, isComplated) => {
    const url = `/api/todos/${id}`

    const res = await fetch(url, {
      method: "PUT",
      header: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ isComplated: isComplated })
    });
    if(res.status === 200) {
      updateList();
    }
    if(res.status !== 200) {
      console.log(res);
    }

  }
  const deleteHandler = async (id) => {
    const url = `/api/todos/${id}`

    const res = await fetch(url, {
      method: "DELETE",
    });
    if(res.status === 200) {
      updateList();
    }
    if(res.status !== 200) {
      console.log(res);
    }

  }
  const updateList = async() => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodosList(data);
  }
  return (
    <>
      <div className="flex items-center justify-center flex-col p-3 w-full lg:w-1/2 mx-auto">
        <NewTaskForm todos={todoList} updateList={updateList} />
        <TaskList changeHandler={changeHandler} deleteHandler={deleteHandler} todos={todoList} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  connectToDb()
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/signin'
      }
    }
  }

  const payloadToken = verifyToken(token);

  if (payloadToken === false) {
    return {
      redirect: {
        destination: '/signin'
      }
    }
  }

  const user = await userModel.findOne({ email: payloadToken.email }, '-password -__v');

  const todos = await todosModel.find({user: user._id}, "-__v -user");

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      todos: JSON.parse(JSON.stringify(todos)) || []
    }
  }
}