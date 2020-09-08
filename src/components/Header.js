import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/auth";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MenuBar from "../components/MenuBar";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
  },
  buttonColor: {
    color: "white",
  },

  horizontal: {
    height: "2px",
    backgroundColor: "#000",
  },
  marginBottom5: {
    marginBottom: "5vh",
  },
  navBarButtons: {
    textAlign: "right",
  },
}));

function Header(props) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  // Dynamically display content based on user log in state
  const header = user ? (
    <div className={classes.marginBottom5}>
      <Grid
        container
        direction="row"
        className={classes.marginBottom5}
        justify="center"
        alignItems="center"
      >
        {/* Link to Homepage */}
        <Grid item xs={3}>
          <Link
            className={classes.title}
            color="secondary"
            component={RouterLink}
            to="/"
          >
            <Typography variant="h3">Photoshopify</Typography>
          </Link>
        </Grid>

        {/* Login/Register Feature */}
        <Grid container item xs={8} justify="flex-end">
          {/* Search Feature */}
          <SearchBar />
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            className={classes.buttonColor}
            size="small"
            to="/login"
            startIcon={<PhotoCamera fontSize="small" />}
          >
            Upload
          </Button>
          <MenuBar />
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className={classes.marginBottom5}>
      <Grid
        container
        direction="row"
        className={classes.marginBottom5}
        justify="center"
        alignItems="center"
      >
        {/* Link to Homepage */}
        <Grid item xs={3}>
          <Link
            className={classes.title}
            color="secondary"
            component={RouterLink}
            to="/"
          >
            <Typography variant="h3">Photoshopify</Typography>
          </Link>
        </Grid>

        {/* Login/Register Feature */}
        <Grid container item xs={8} justify="flex-end">
          {/* Search Feature */}
          <SearchBar />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            component={RouterLink}
            to="/login"
          >
            Log In
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.buttonColor}
            component={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return header;
}

export default Header;
