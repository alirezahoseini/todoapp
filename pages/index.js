import NewTaskForm from "@/components/modules/NewTaskForm/NewTaskForm";
import TaskList from "@/components/modules/TaskList/TaskList";
import connectToDb from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import userModel from '@/models/user'


export default function MyApp() {

  return (
    <>
      <div className="flex items-center justify-center flex-col p-3 w-full lg:w-1/2 mx-auto">
        <NewTaskForm />
        <TaskList />
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

  const user = await userModel.findOne({ email: payloadToken.email }, '-password -__v')

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}