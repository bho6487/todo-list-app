import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./Index.css";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import useLocalStorage from "./hooks/useLocalStorage";

function App(props) {
  const LOCAL_STORAGE_PREFIX = "TODO_LIST_APP-";
  const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
  const [tasks, setTasks] = useLocalStorage(TODOS_STORAGE_KEY, props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    //iterate over the tasks array and check each task
    //perform the check on each task and return a new array
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    //we want new array where the id does not equal task.id
    //if id === task.id then exclude it from the new array
    //we only want new array where the id !== task.id
    //so everything that is NOT id === task.id
    //id !== task.id is the condition that we want in the new filtered array
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    if (newName === "") {
      alert("No Changes Made!");
    } else {
      //iterate over the tasks array and perform the check on each element
      const editedTaskList = tasks.map((task) => {
        //if the id of the element we're editing matches the task.id
        if (id === task.id) {
          //change the name to newName
          return { ...task, name: newName };
        }
        //return all other element in the array that id !== task.id
        return task;
      });
      //update tasks state
      setTasks(editedTaskList);
    }
  }

  //callback function to pass data from child to parent
  function addTask(name) {
    if (name === "") {
      alert("Please Enter a Valid Task!");
    } else {
      //use the name sent from the form to create a new Task object
      const newTask = { id: `todo-${nanoid()}`, name, completed: false };
      //add the newTask object to the tasks array
      setTasks([...tasks, newTask]);
    }
  }

  /**
   * Right now, our taskList constant in App() maps over the tasks state and returns a new <Todo /> component for all of them.
   * This is not what we want! A task should only render if it is included in the results of applying the selected filter.
   * Before we map over the tasks state, we should filter it (with Array.prototype.filter()) to eliminate objects we don't want to render.
   *
   * In order to decide which callback function to use in Array.prototype.filter(),
   * we access the value in FILTER_MAP that corresponds to the key of our filter state.
   * When filter is All, for example, FILTER_MAP[filter] will evaluate to () => true.
   */
  const taskList = tasks
    //FILTER_MAP[filter] provides the key:value pair from the object
    //ex: tasks.filter(task => !task.completed);
    .filter(props.FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = props.FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      /**We know that the <FilterButton /> should report whether it is currently pressed
       * it should be pressed if its name matches the current value of our filter state
       * this will return true or false
       */
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>To Do List App!</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
