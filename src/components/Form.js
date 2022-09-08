import { useState } from "react";
import { Button, Typography } from "@mui/material";
import Input from "@mui/material/Input";

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
      <Typography variant="h6">Enter Your Task:</Typography>
      <Input
        type="text"
        id="new-todo-input"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
};

export default Form;
