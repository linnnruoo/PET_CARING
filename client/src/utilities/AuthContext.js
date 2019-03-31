import React from 'react';
import AuthService from './AuthService'

const Auth = new AuthService(process.env.REACT_APP_CLIENT_URL)

const AuthContext = React.createContext({
  isLoggedIn: false,
  id: '',
  userRole: ''
});

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    id: '',
    userRole: ''
  }

  componentDidMount = () => {
    this.setState({
      isLoggedIn: Auth.isLoggedIn(),
      id: Auth.getID() || '',
      userRole: Auth.getRole() || 'Visitor'
    })
  }

  render() {
    const { isLoggedIn, id, userRole } = this.state;
    return (
      <AuthContext.Provider
        value={{ isLoggedIn, id, userRole }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthConsumer, AuthProvider };
