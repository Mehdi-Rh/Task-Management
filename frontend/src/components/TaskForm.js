import React, { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    function getRandomFutureDate() {
      const randomDays = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 30
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 5);

      return currentDate;
    }
    const mockDueDate = getRandomFutureDate();
    const task = { taskId, title, description, category, dueDate: mockDueDate, status };
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle("");
      setDescription("");
      setCategory("");
      setDueDate("");
      setStatus("");
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>
      <label>TaskId</label>
      <input
        type="text"
        onChange={(e) => setTaskId(e.target.value)}
        value={taskId}
        className={emptyFields?.includes("taskId") ? "error" : ""}
      />
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes("title") ? "error" : ""}
      />
      <label>Description :</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields?.includes("description") ? "error" : ""}
      />
      <label>Category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields?.includes("category") ? "error" : ""}
      />
      <label>Due Date:</label>
      <input
        type="text"
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
        className={emptyFields?.includes("dueDate") ? "error" : ""}
      />
      <label>Status:</label>
      <input
        type="text"
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        className={emptyFields?.includes("status") ? "error" : ""}
      />
      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
