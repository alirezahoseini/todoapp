import NewTaskForm from "@/components/modules/NewTaskForm/NewTaskForm";
import TaskList from "@/components/modules/TaskList/TaskList";


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