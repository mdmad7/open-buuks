import React, { Component } from 'react';
import logo from '../images/logo.svg';
import authService from './authService';
import { Button, Form, Grid, Image, Segment, Message } from 'semantic-ui-react';
class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
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
          : this.props.history.replace('/dashboard/index');
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
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 550, minWidth: 320 }}>
            <Form size="large" onSubmit={this.handleFormSubmit} error>
              <Segment>
                <div className="logo_container">
                  <Image src={logo} className="login_logo" />
                </div>
                <Form.Input
                  fluid
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  type="email"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                {this.state.error ? (
                  <Message error content={this.state.error} />
                ) : null}

                <Button fluid size="medium" className="login_button">
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
