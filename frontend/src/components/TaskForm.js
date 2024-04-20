import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { categories, statuses, dispatch } = useTasksContext();

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
    <>
      {categories && statuses && (
        <FormControl className="create" onSubmit={handleSubmit}>
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
          {/* <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields?.includes("category") ? "error" : ""}
      /> */}
          <InputLabel>Category</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.value}
              </MenuItem>
            ))}
          </Select>

          <label>Due Date:</label>
          <input
            type="text"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            className={emptyFields?.includes("dueDate") ? "error" : ""}
          />
          <label>Status:</label>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.value}
              </MenuItem>
            ))}
          </Select>
          <button>Add Task</button>
          {error && <div className="error">{error}</div>}
        </FormControl>
      )}
    </>
  );
};

export default TaskForm;
