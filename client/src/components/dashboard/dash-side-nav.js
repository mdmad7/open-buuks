import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DashSideNav = ({ visible, logout, user }) => {
  return (
    <Sidebar
      as={Menu}
      animation="push"
      width="thin"
      visible={visible}
      vertical
      inverted
      className="dash_side_nav"
    >
      <Menu.Item name="home">
        <span>Welcome {user.firstName}</span>
      </Menu.Item>
      <Menu.Item name="home" link>
        <Link to="/dashboard">
          <Icon name="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item name="user" link>
        <Link to="/dashboard/author">
          <Icon name="user" />
          Author
        </Link>
      </Menu.Item>
      <Menu.Item name="book" link>
        <Link to="/dashboard/book">
          <Icon name="book" />
          Book
        </Link>
      </Menu.Item>
      <Menu.Item name="table" link>
        <Link to="/dashboard/bookinstance">
          <Icon name="table" />
          Book Instance
        </Link>
      </Menu.Item>
      <Menu.Item name="tag" link>
        <Link to="/dashboard/genre">
          <Icon name="tag" />
          Genre
        </Link>
      </Menu.Item>
      <Menu.Item name="logout" link>
        <Link to="" onClick={logout}>
          <Icon name="power" />
          Log Out
        </Link>
      </Menu.Item>
    </Sidebar>
  );
};

export default DashSideNav;
