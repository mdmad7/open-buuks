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
    >
      <Menu.Item name="home">
        <span>Welcome {user.firstName}</span>
      </Menu.Item>
      <Menu.Item name="home">
        <Link to="/dashboard">
          <Icon name="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item name="user">
        <Link to="/dashboard/author">
          <Icon name="user" />
          Author
        </Link>
      </Menu.Item>
      <Menu.Item name="book">
        <Link to="/dashboard/book">
          <Icon name="book" />
          Book
        </Link>
      </Menu.Item>
      <Menu.Item name="table">
        <Link to="/dashboard/bookinstance">
          <Icon name="table" />
          Book Instance
        </Link>
      </Menu.Item>
      <Menu.Item name="logout" onClick={logout}>
        <Icon name="power" />
        Log Out
      </Menu.Item>
    </Sidebar>
  );
};

export default DashSideNav;
