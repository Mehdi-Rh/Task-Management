import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    console.log({ user: user.token });

    // eslint-disable-next-line no-extra-boolean-cast
    if (user) {
      console.log("fetch: ", user);
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {console.log({ tasks })}
      <div className="tasks">
        {tasks && tasks.map((task) => <TaskDetails key={task._id} task={task} />)}
      </div>
      <TaskForm />
    </div>
  );
};

export default Home;
