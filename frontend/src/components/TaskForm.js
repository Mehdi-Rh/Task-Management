import React, { useEffect, useState } from "react";

import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = ({ handleClose }) => {
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

    const task = { taskId, title, description, category, dueDate, status };
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      }
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
    handleClose();
  };

  useEffect(() => {
    if (emptyFields.length == 0 && error == "Please fill in all fields") setError("");
  }, [emptyFields]);

  return (
    <>
      {categories && statuses && (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a New Task</h3>
          <label>TaskId</label>
          <input
            type="text"
            onChange={(e) => {
              setEmptyFields((prev) => prev.filter((item) => item != "taskId"));
              setTaskId(e.target.value);
            }}
            value={taskId}
            className={emptyFields?.includes("taskId") ? "error" : ""}
          />
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => {
              setEmptyFields((prev) => prev.filter((item) => item != "title"));
              setTitle(e.target.value);
            }}
            value={title}
            className={emptyFields?.includes("title") ? "error" : ""}
          />
          <label>Description :</label>
          <input
            type="text"
            onChange={(e) => {
              setEmptyFields((prev) => prev.filter((item) => item != "description"));
              setDescription(e.target.value);
            }}
            value={description}
            className={emptyFields?.includes("description") ? "error" : ""}
          />
          <label htmlFor="category">Category :</label>
          <select
            name="categories"
            id="categories"
            defaultValue={"DEFAULT"}
            onChange={(e) => {
              setEmptyFields((prev) => prev.filter((item) => item != "category"));
              setCategory(e.target.value);
            }}
            className={emptyFields?.includes("category") ? "error" : ""}
          >
            <option value="DEFAULT" disabled hidden>
              Choose category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <label>Due Date:</label>
          <input
            type="datetime-local"
            onChange={(e) => {
              setEmptyFields((prev) => prev.filter((item) => item != "dueDate"));
              setDueDate(e.target.value);
            }}
            value={dueDate}
            className={emptyFields?.includes("dueDate") ? "error" : ""}
          />
          <label htmlFor="status">Status :</label>
          <select
            name="status"
            id="status"
            defaultValue={"DEFAULT"}
            onChange={(e) => {
              setEmptyFields((prev) => prev.filter((item) => item != "status"));
              setStatus(e.target.value);
            }}
            className={emptyFields?.includes("status") ? "error" : ""}
          >
            <option value="DEFAULT" disabled hidden>
              Choose status
            </option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>{" "}
          <button
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
            type="submit"
          >
            Add Task
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </>
  );
};

export default TaskForm;
