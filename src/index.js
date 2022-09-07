import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const DATA = [
  { id: "todo-0", name: "Eat", completed: false },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} FILTER_MAP={FILTER_MAP} FILTER_NAMES={FILTER_NAMES} />
  </React.StrictMode>
);
