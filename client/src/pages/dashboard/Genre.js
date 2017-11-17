import React, { Component } from 'react';
import axios from 'axios';
import {
  Grid,
  Modal,
  Header,
  Button,
  Segment,
  Icon,
  Table,
} from 'semantic-ui-react';
import GenreForm from '../../components/dashboard/genre-form';

class GenrePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: null,
      modalOpen: false,
      error: null,
    };

    this.confirmDelete = this.confirmDelete.bind(this);
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
      url: '/catalog/genre',
      data: {
        name: this.state.name,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      // console.log(response);
      this.setState({
        error: response.data.message,
        name: '',
      });

      this.state.error ? console.log() : this.handleModalClose();
      this.reloadGenres();
    });
  };

  handleEdit = id => {
    axios({
      method: 'put',
      url: `/catalog/genre/${id}`,
      data: {
        name: this.state.name,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState({
        error: response.data.message,
        name: '',
      });

      this.reloadGenres();
    });
  };

  handleModalOpen = () => this.setState({ modalOpen: true });
  handleModalClose = () => this.setState({ modalOpen: false });

  confirmDelete(id) {
    axios({
      url: `/catalog/genre/${id}`,
      method: 'delete',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      // console.log(response);
      this.reloadGenres();
    });
  }

  reloadGenres = () => {
    axios({
      method: 'get',
      url: '/catalog/genres',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState({
        genres: response.data,
      });
    });
  };

  componentDidMount() {
    this.reloadGenres();
  }

  render() {
    const { genres, modalOpen, error } = this.state;
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
                <Header icon="add" content="Create a Genre" />
                <Modal.Content>
                  <GenreForm
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
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {genres ? (
                genres.map(genre => {
                  return (
                    <Table.Row key={genre.id}>
                      <Table.Cell collapsing>
                        <Icon name="tag" />
                      </Table.Cell>
                      <Table.Cell>{genre.name}</Table.Cell>
                      <Table.Cell selectable warning>
                        <Modal
                          size="tiny"
                          closeIcon
                          trigger={<a className="fakeBtn">Edit</a>}
                        >
                          <Header icon="add" content={`Edit ${genre.name}`} />
                          <Modal.Content>
                            <GenreForm
                              error={error}
                              onSubmit={() => this.handleEdit(genre._id)}
                              actionname="Edit"
                              color="blue"
                              onChange={this.handleChange}
                              genre={genre}
                            />
                          </Modal.Content>
                        </Modal>
                      </Table.Cell>
                      <Table.Cell selectable negative>
                        <Modal
                          trigger={<a className="fakeBtn">Delete</a>}
                          basic
                          size="small"
                        >
                          <Header
                            icon="trash"
                            content={`Delete ${genre.name}`}
                          />
                          <Modal.Content>
                            <p>
                              Are you sure you want to delete {genre.name} ?
                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              color="red"
                              inverted
                              onClick={() => this.confirmDelete(genre._id)}
                            >
                              <Icon name="checkmark" /> Yes
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell>No Genres Available</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default GenrePage;
