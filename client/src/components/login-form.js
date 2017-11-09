import React, { Component } from 'react';
import logo from '../images/logo.svg';

class LoginForm extends Component {
  render() {
    return (
      <div className="login_form">
        <div className="form_bg_img" />
        <div className="login_div">
          <div className="logo_div text-center">
            <img src={logo} width="150" />
            {/* <span> Your only book library</span> */}
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="">
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
