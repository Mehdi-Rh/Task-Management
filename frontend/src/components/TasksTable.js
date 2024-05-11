import React from "react";
import { useTasksContext } from "../hooks/useTasksContext";

const TasksTable = () => {
  return (
    <table id="myTable">
      <Header />
      <TableBody />
    </table>
  );
};

export default TasksTable;

const Header = () => {
  const headers = [
    { key: "taskId", label: "Task Id" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "category", label: "Category" },
    { key: "dueDate", label: "Due Date" },
    { key: "status", label: "Status" },
  ];
  return (
    <thead>
      <tr className="tableHeader">
        {headers.map((header) => (
          <th key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = () => {
  const { tasks } = useTasksContext();

  return (
    <tbody>
      {tasks?.map((task) => (
        <tr key={task._id}>
          <td>{task.taskId}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.category}</td>
          <td>{task.dueDate}</td>
          <td>{task.status}</td>
        </tr>
      ))}
    </tbody>
  );
};
