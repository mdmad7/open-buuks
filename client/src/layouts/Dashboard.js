import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, Segment, Button } from 'semantic-ui-react';

import authService from '../components/authService';
import withAuth from '../components/withAuthHOC';

import DashSideNav from '../components/dashboard/dash-side-nav';

import AuthorPage from '../pages/dashboard/Author';
import GenrePage from '../pages/dashboard/Genre';
import BookPage from '../pages/dashboard/Book';
import BookInstancePage from '../pages/dashboard/Bookinstance';
import HomePage from '../pages/dashboard/Home';
const Auth = new authService();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeMenuItem: '',
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/admin');
  }

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeMenuItem: name });
  };

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible, activeMenuItem } = this.state;
    return (
      <div className="main_dashboard_ui" style={{ height: '100vh' }}>
        <Sidebar.Pushable as={Segment}>
          <DashSideNav
            visible={visible}
            logout={this.handleLogout}
            user={this.props.user}
            handleMenuItemClick={this.handleMenuItemClick}
            activeMenuItem={activeMenuItem}
          />
          <Sidebar.Pusher>
            <div>
              <Button
                onClick={this.toggleVisibility}
                primary
                // size="large"
                content="Menu"
                icon="content"
                labelPosition="left"
                className="no-border-radius"
              />
              <Switch>
                <Route exact path="/dashboard/index" component={HomePage} />
                <Route path="/dashboard/author" component={AuthorPage} />
                <Route path="/dashboard/book" component={BookPage} />
                <Route
                  path="/dashboard/bookinstance"
                  component={BookInstancePage}
                />
                <Route path="/dashboard/genre" component={GenrePage} />
              </Switch>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default withAuth(Dashboard);
