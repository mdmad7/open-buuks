import React, { Component } from 'react';
import logo from '../images/logo.svg';
import authService from './authService';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new authService();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth
      .login(this.state.email, this.state.password)
      .then(res => {
        res.data.error
          ? this.setState({
              error: res.data.error,
            })
          : this.props.history.replace('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/dashboard');
    }
  }

  render() {
    return (
      <div className="login_form">
        <div className="form_bg_img" />
        <div className="login_div">
          <div className="logo_div text-center">
            <img src={logo} width="150" alt="logo" />
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="passwordInput"
                placeholder="Password"
                onChange={this.handleChange}
              />
              {this.state.error ? (
                <span className="p-3 mb-2 text-danger">{this.state.error}</span>
              ) : null}
            </div>
            <button type="submit" className="" onClick={this.handleFormSubmit}>
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
