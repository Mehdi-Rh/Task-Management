import React, { createContext, useReducer } from "react";

export const TasksContext = createContext();

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...action.payload,
      };
    case "CREATE_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id != action.payload._id),
      };
    default:
      return;
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null,
  });
  return <TasksContext.Provider value={{ ...state, dispatch }}>{children} </TasksContext.Provider>;
};
