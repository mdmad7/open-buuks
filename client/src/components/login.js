import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="login_page">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder="enter email" />
          <input type="password" placeholder="enter password" />
        </form>
      </div>
    );
  }
}

export default Login;
