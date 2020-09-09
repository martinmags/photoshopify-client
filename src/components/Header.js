import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/auth";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import MenuBar from "../components/MenuBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
  const { user, logout } = useContext(AuthContext);

  // Hacky workaround the need to refresh to show data
  let username = "";
  if (user) {
    if (user.user) {
      username = user.user.username;
    } else {
      username = user.username;
    }
  }
  // Handle menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleLogout = (event) => {
    handleClose();
    logout();
  };

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
            className={classes.buttonColor}
            size="small"
            startIcon={<PhotoCamera fontSize="small" />}
          >
            Upload
          </Button>
          {/* LoggedIn NavBar */}
          <Button size="small" onClick={handleClick} color="primary">
            <AccountCircle />
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link color="secondary" component={RouterLink} to="/">
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                color="secondary"
                component={RouterLink}
                to={`/gallery/${username}`}
              >
                My Gallery
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
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
