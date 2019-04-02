import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

class ProtectedRoute extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount = () => {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const { component: Component, ...rest } = this.props;

    if (this.state.isLoading) return null;

    return (
      <AuthConsumer>
        {({ isLoggedIn }) => {
          return (
            <Route
              render={
                props =>
                  isLoggedIn 
                  ? <Component {...props} /> 
                  : <Redirect to="/" />
              }
              {...rest}
            />
          )
        }}
      </AuthConsumer>
    )
  }
}

export default ProtectedRoute;
