import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TaskDetails from "../components/TaskDetails";
import TasksTable from "../components/TasksTable";
import AddTaskModal from "./AddTaskModal";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    // eslint-disable-next-line no-extra-boolean-cast
    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          id="myInput"
          onKeyUp={(e) => console.log(e.target.value)}
          placeholder="Search for names.."
          title="Type in a name"
        />
        <AddTaskModal />
      </div>
      <TasksTable />
    </div>
  );
};

export default Home;
