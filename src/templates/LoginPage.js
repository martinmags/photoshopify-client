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

function LoginPage(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login(userData);
      props.history.push(`/mygallery`);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={11}>
          <Typography variant="h1">Log In</Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <Grid item>
            {errors.general !== "" && (
              <Typography color="error" gutterBottom>
                {errors.general}
              </Typography>
            )}
          </Grid>
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
          <Grid item className={classes.marginBottom5}>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Grid>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        firstname
        lastname
        updatedat
      }
    }
  }
`;
export default LoginPage;
