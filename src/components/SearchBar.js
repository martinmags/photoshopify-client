import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/InputBase";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "1rem",
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [urlRedirect, setUrlRedirect] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    const username = data.username.toLowerCase();
    setUrlRedirect(`/gallery/${username}`);
  };

  return (
    <Paper
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      className={classes.root}
    >
      <TextField
        inputRef={register({ required: true })}
        className={classes.input}
        placeholder="Search..."
        name="username"
      />
      <Button type="submit" size="small">
        <SearchIcon fontSize="small" />
      </Button>
      {urlRedirect !== "" && <Redirect to={urlRedirect} />}
    </Paper>
  );
}

export default SearchBar;
