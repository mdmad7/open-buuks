import React from 'react';
import { Sidebar, Menu, Icon, Modal, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
      animation="push"
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
      <Menu.Item name="bookinstance">
        <Link to="/dashboard/bookinstance">
          <Icon name="table" />
          Book Instance
        </Link>
      </Menu.Item>
      <Menu.Item name="genre">
        <Link to="/dashboard/genre">
          <Icon name="tag" />
          Genre
        </Link>
      </Menu.Item>
      <Menu.Item name="logout">
        {/* <Link to="" >
          <Icon name="power" />
          Log Out
        </Link> */}
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
