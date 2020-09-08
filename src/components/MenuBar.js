import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

function MenuBar() {
  const { logout } = useContext(AuthContext);

  // Handle menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button size="small" onClick={handleClick} color="primary">
        <AccountCircle />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link color="secondary" component={RouterLink} to="/">
            Home
          </Link>
        </MenuItem>

        <MenuItem>
          <Link color="secondary" component={RouterLink} to="/gallery">
            My Gallery
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default MenuBar;
