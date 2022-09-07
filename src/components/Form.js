import { useState } from "react";

const Form = ({ addTask }) => {
  //keep track of user's input
  const [name, setName] = useState("");

  //when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(name);
    setName("");
  };

  //when input field is changed
  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Enter Your Task:
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
