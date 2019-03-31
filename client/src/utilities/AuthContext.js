import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  id: '',
  userRole: ''
});

class AuthProvider extends React.Component {
  state = { isLoggedIn: false }
  render() {
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: this.state.isLoggedIn }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider };
