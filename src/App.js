import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./templates/HomePage";
import GalleryPage from "./templates/GalleryPage";
import SignupPage from "./templates/SignupPage";
import LoginPage from "./templates/LoginPage";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Router>
          <Header />
          <Switch>
            {/* Public */}
            <Route exact path="/" component={HomePage} />
            {/* Don't allow access if already Logged In */}
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
            {/* Protected */}
            <Route exact path="/gallery" component={GalleryPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
