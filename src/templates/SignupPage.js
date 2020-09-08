import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function SignupPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={11}>
          <Typography variant="h1">Sign Up</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <form>
          <Grid item>
            <TextField fullWidth required label="Username" />
          </Grid>
          <Grid item>
            <TextField fullWidth required label="Email" />
          </Grid>
          <Grid item>
            <TextField label="First Name" style={{ marginRight: "10px" }} />
            <TextField label="Last Name" />
          </Grid>
          <Grid item>
            <TextField fullWidth required label="Password" />
          </Grid>
          <Grid item>
            <TextField fullWidth required label="Confirm Password" />
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}

export default SignupPage;
