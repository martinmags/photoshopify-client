import { createMuiTheme } from "@material-ui/core";

export let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffa02c",
    },
    secondary: {
      light: "#f2f2f2",
      main: "#000",
      dark: "#515151",
    },
  },
  shawdows: 0,

  // Typography Specifications
  // TODO: Add responsiveFontSizes() once grid is implemented
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 30,
    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 800,
      fontStyle: "normal",
    },
    h4: "h3",
    h5: "h3",
    h6: "h3",
    body1: {
      fontSize: "1rem",
    },
    button: {
      fontSize: "1rem",
      textTransform: "none",
      margin: 5,
      color: "white",
    },
  },
});

// Typography
theme.typography.h1 = {
  [theme.breakpoints.up("xs")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
};
theme.typography.h2 = {
  [theme.breakpoints.up("xs")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
};
theme.typography.h3 = {
  [theme.breakpoints.up("xs")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.2rem",
  },
};
