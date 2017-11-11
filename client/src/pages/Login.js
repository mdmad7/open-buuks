import React, { Component } from 'react';
import LoginForm from '../components/login-form';

class Login extends Component {
  render() {
    return (
      <div className="login_page">
        <LoginForm history={this.props.history} />
      </div>
    );
  }
}

export default Login;
