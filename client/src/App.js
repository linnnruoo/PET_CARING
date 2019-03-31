import React, { Component } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './utilities/AuthContext';
import ProtectedRoute from './utilities/ProtectedRoute';

import Navbar from './components/nav/Navbar';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#f48b94' },
    secondary: { main: '#f6a7a5' },
  },
  typography: { fontFamily: '"Open Sans", sans-serif' },
})

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <MuiThemeProvider theme={theme}>
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
            <ToastContainer />
          </MuiThemeProvider>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
