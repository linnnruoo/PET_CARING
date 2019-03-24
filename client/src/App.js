import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import Navbar from './components/nav/Navbar';

import HomePage from './pages/HomePage';

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
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <Route exact path="/" component={HomePage} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
