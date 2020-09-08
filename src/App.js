import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./templates/HomePage";
import GalleryPage from "./templates/GalleryPage";
import SignupPage from "./templates/SignupPage";
import LoginPage from "./templates/LoginPage";
import { AuthProvider } from "./context/auth";
import ProtectedRoute from "./util/ProtectedRoute";
import PublicRoute from "./util/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Router>
          <Header />
          <Switch>
            {/* Public */}
            <Route exact path="/" component={HomePage} />
            {/* Don't allow access if already Logged In */}
            <PublicRoute exact path="/signup" component={SignupPage} />
            <PublicRoute exact path="/login" component={LoginPage} />
            {/* Protected: Access only if authenticated/logged in */}
            <ProtectedRoute exact path="/gallery" component={GalleryPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
