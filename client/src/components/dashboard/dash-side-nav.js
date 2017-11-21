import React from 'react';
import { Sidebar, Menu, Icon, Modal, Button, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const DashSideNav = ({
  visible,
  logout,
  user,
  activeMenuItem,
  handleMenuItemClick,
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="slide along"
      width="thin"
      visible={visible}
      vertical
      inverted
      className="dash_side_nav"
    >
      {/* <Menu.Item name="profile">
        <span>Welcome {user.firstName}</span>
      </Menu.Item> */}
      <Menu.Item name="home">
        <NavLink
          to="/dashboard/index"
          activeStyle={{
            fontWeight: 'bold',
            backgroundColor: '#bf545d',
          }}
        >
          <Icon name="home" />
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item name="author">
        <NavLink
          to="/dashboard/author"
          activeStyle={{
            fontWeight: 'bold',
            backgroundColor: '#bf545d',
          }}
        >
          <Icon name="user" />
          Author
        </NavLink>
      </Menu.Item>
      <Menu.Item name="book">
        <NavLink
          to="/dashboard/book"
          activeStyle={{
            fontWeight: 'bold',
            backgroundColor: '#bf545d',
          }}
        >
          <Icon name="book" />
          Book
        </NavLink>
      </Menu.Item>
      <Menu.Item name="bookinstance">
        <NavLink
          to="/dashboard/bookinstance"
          activeStyle={{
            fontWeight: 'bold',
            backgroundColor: '#bf545d',
          }}
        >
          <Icon name="table" />
          Book Instance
        </NavLink>
      </Menu.Item>
      <Menu.Item name="genre">
        <NavLink
          to="/dashboard/genre"
          activeStyle={{
            fontWeight: 'bold',
            backgroundColor: '#bf545d',
          }}
        >
          <Icon name="tag" />
          Genre
        </NavLink>
      </Menu.Item>
      <Menu.Item name="logout">
        <Modal
          trigger={
            <p>
              <Icon name="power" />
              Log Out
            </p>
          }
          closeIcon
          basic
          dimmer="blurring"
          size="small"
        >
          <Header icon="power" content="Log Out" />
          <Modal.Content>
            <p>Are you sure you want to log out?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={logout}>
              <Icon name="checkmark" /> Log Out
            </Button>
          </Modal.Actions>
        </Modal>
      </Menu.Item>
    </Sidebar>
  );
};

export default DashSideNav;
