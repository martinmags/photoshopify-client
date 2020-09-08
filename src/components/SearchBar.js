import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";

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

  return (
    <Paper component="form" className={classes.root}>
      <InputBase className={classes.input} placeholder="Search..." />
      <IconButton size="small">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
