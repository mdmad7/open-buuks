import React, { Component } from 'react';
import axios from 'axios';
import {
  Grid,
  Modal,
  Header,
  Button,
  Segment,
  Table,
  Icon,
} from 'semantic-ui-react';

import AuthorForm from '../../components/dashboard/author-form';
class AuthorPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: null,
      modalOpen: false,
      error: null,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  handleCreate = () => {
    axios({
      method: 'post',
      url: '/catalog/author',
      data: {
        first_name: this.state.first_name,
        family_name: this.state.family_name,
        bio: this.state.bio,
        date_of_birth: this.state.date_of_birth,
        date_of_death: this.state.date_of_death,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState({
        error: response.data.message,
      });

      this.state.error ? console.log() : this.handleModalClose();
      this.loadAuthors();
    });
  };

  handleModalOpen = () => this.setState({ modalOpen: true });
  handleModalClose = () => this.setState({ modalOpen: false });

  loadAuthors = () => {
    axios({
      method: 'get',
      url: '/catalog/authors',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      console.log(response);
      this.setState({
        authors: response.data,
      });
    });
  };

  componentDidMount() {
    this.loadAuthors();
  }
  render() {
    const { authors, modalOpen, error } = this.state;
    return (
      <div>
        <Grid textAlign="right">
          <Grid.Row>
            <Grid.Column>
              <Modal
                size="tiny"
                open={modalOpen}
                onClose={this.handleModalClose}
                trigger={
                  <Button
                    primary
                    content="Add"
                    icon="add"
                    labelPosition="left"
                    onClick={this.handleModalOpen}
                  />
                }
              >
                <Header icon="add" content="Create Author" />
                <Modal.Content>
                  <AuthorForm
                    error={this.state.error}
                    onSubmit={this.handleCreate}
                    actionname="Create"
                    color="green"
                    onChange={this.handleChange}
                    name={this.state.name}
                  />
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Bio</Table.HeaderCell>
                <Table.HeaderCell>Birthday</Table.HeaderCell>
                <Table.HeaderCell>Death Day</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {authors ? (
                authors.map(author => {
                  return (
                    <Table.Row key={author.id}>
                      <Table.Cell collapsing>
                        <Icon name="tag" />
                      </Table.Cell>
                      <Table.Cell>{author.fullname}</Table.Cell>
                      <Table.Cell>{author.bio}</Table.Cell>
                      <Table.Cell>{author.date_of_birth_formatted}</Table.Cell>
                      <Table.Cell>{author.date_of_death_formatted}</Table.Cell>
                      <Table.Cell selectable warning>
                        <a className="fakeBtn">Edit</a>
                      </Table.Cell>
                      <Table.Cell selectable negative>
                        <a className="fakeBtn">Delete</a>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell>No Authors Available</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default AuthorPage;
