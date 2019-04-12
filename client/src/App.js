import React, { Component } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/SetAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import ProtectedRoute from "./utilities/ProtectedRoute";

import Navbar from "./components/nav/Navbar";

// import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import UserProfilePage from "./pages/UserProfilePage";
import BrowsePage from "./pages/BrowsePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/footer/Footer";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#6F9283" },
    secondary: { main: "#cdc6a5" }
  },
  typography: { fontFamily: '"Open Sans", sans-serif' }
});

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <Navbar />
            <Route exact path="/" component={BrowsePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/browse" component={BrowsePage} />
            <Route exact path="/profile/:userId" component={UserProfilePage} />
            <Route
              exact
              path="/service/:serviceId"
              component={ServiceDetailPage}
            />
            <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
            <Footer />
            <ToastContainer />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
