import React, { Component } from 'react';
import authService from '../../components/authService';
import withAuth from '../../components/withAuthHOC';
const Auth = new authService();

class Homepage extends Component {
  handleLogout() {
    Auth.logout();
    this.props.history.replace('/admin');
  }

  render() {
    return (
      <div>
        {console.log(this.props)}
        <h2>Welcome to Homepage</h2>
        <h2>Welcome {this.props.user.firstName}</h2>
        <p className="App-intro">
          <button
            type="button"
            className="form-submit"
            onClick={this.handleLogout.bind(this)}
          >
            Logout
          </button>
        </p>
      </div>
    );
  }
}

export default withAuth(Homepage);
