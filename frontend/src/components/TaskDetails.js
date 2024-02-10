import React from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };
  return (
    <div className="task-details">
      <h6>{task.taskId}</h6>
      <h4>{task.title}</h4>
      <p>
        <strong>Description: </strong>
        {task.description}
      </p>
      <p>
        <strong>Category: </strong>
        {task.category}
      </p>
      <p>
        <strong>Due Date: </strong>
        {task.dueDate}
      </p>
      <p>
        <strong>Status: </strong>
        {task.status}
      </p>
      <p>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
