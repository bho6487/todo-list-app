import React, { useState } from "react";

import Input from "@mui/material/Input";
import { Button, ListItem, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

const Todo = ({
  name,
  completed,
  id,
  toggleTaskCompleted,
  deleteTask,
  editTask,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="h6" htmlFor={id}>
          New name for {name}
        </Typography>
        <Input id={id} type="text" onChange={handleChange} />
      </div>
      <div>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setEditing(false)}
        >
          {`Cancel renaming ${name}`}
        </Button>
        <Button
          type="submit"
          variant="outlined"
        >{`Save renaming ${name}`}</Button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Checkbox
            id={id}
            onChange={() => toggleTaskCompleted(id)}
            htmlFor={id}
            checked={completed}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">{name}</Typography>
        </Grid>
      </Grid>

      <div>
        <Button
          variant="outlined"
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
        >
          {`Edit ${name}`}
        </Button>
        <Button variant="outlined" type="button" onClick={() => deleteTask(id)}>
          {`Delete ${name}`}
        </Button>
      </div>
    </div>
  );

  return (
    <ListItem className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </ListItem>
  );
};

export default Todo;
