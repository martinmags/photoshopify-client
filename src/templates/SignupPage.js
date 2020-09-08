import React, { useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles((theme) => ({
  marginBottom5: {
    marginBottom: "5vh",
  },
}));

function SignupPage(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={11}>
          <Typography variant="h1">Sign Up</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <Grid item>
            <TextField
              error={errors.username ? true : false}
              helperText={errors.username}
              name="username"
              values={values.username}
              onChange={onChange}
              fullWidth
              required
              type="text"
              label="Username"
            />
          </Grid>
          <Grid item>
            <TextField
              error={errors.email ? true : false}
              helperText={errors.email}
              name="email"
              values={values.email}
              onChange={onChange}
              fullWidth
              required
              type="email"
              label="Email"
            />
          </Grid>
          <Grid item>
            <TextField
              name="firstname"
              type="text"
              values={values.firstname}
              onChange={onChange}
              label="First Name"
              style={{ marginRight: "10px" }}
            />
            <TextField
              name="lastname"
              type="text"
              values={values.lastname}
              onChange={onChange}
              label="Last Name"
            />
          </Grid>
          <Grid item>
            <TextField
              error={errors.password ? true : false}
              helperText={errors.password}
              name="password"
              type="password"
              values={values.password}
              onChange={onChange}
              fullWidth
              required
              label="Password"
            />
          </Grid>
          <Grid item className={classes.marginBottom5}>
            <TextField
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              name="confirmPassword"
              type="password"
              values={values.confirmPassword}
              onChange={onChange}
              fullWidth
              required
              label="Confirm Password"
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Grid>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $firstname: String
    $lastname: String
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      username: $username
      email: $email
      firstname: $firstname
      lastname: $lastname
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      user {
        id
        username
        email
        firstname
        lastname
        createdat
      }
    }
  }
`;
export default SignupPage;
