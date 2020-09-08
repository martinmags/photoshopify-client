import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "inherit",
    height: "inherit",
  },
}));

function Photo(props) {
  const classes = useStyles();

  const { id, username, filepath, likes, tags } = props.photo;
  return (
    <div>
      <p>{username}</p>
      <p>{likes}</p>
      <ButtonBase className={classes.image}>
        <img alt={username} src={filepath} />
      </ButtonBase>
    </div>
  );
}

export default Photo;
