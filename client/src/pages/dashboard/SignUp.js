import React, { Component } from 'react';
import axios from 'axios';
import SignupForm from '../../components/dashboard/signup_form';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
    };
  }

  handleCreate = () => {
    axios({
      method: 'post',
      url: '/user/signup',
      data: {
        firstName: this.state.first_name,
        lastName: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        success: true,
      });
    });
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="signup_page">
        <SignupForm
          onSubmit={this.handleCreate}
          onChange={this.handleChange}
          user={{
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
          }}
          success={this.state.success}
        />
      </div>
    );
  }
}

export default SignUp;
