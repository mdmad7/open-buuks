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
      visibleMessage: false,
      authors: null,
      modalOpen: false,
      searchError: {
        switch: false,
        msg: '',
      },
      error: null,
      loading: false,
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      searchError: { switch: false, msg: '' },
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
        first_name: '',
        family_name: '',
        bio: '',
        date_of_birth: '',
        date_of_death: '',
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
      console.log(Object.keys(response.data).length);
      this.setState({
        authors: response.data,
      });
    });
  };

  searchAuthor = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let name = document.getElementById('authorSearch').value;
    axios
      .get(`http://openlibrary.org/search.json?author=${name}`, {
        headers: {
          // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          // 'Access-Control-Allow-Headers':
          //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        },
      })
      .then(response => {
        if (response.data.numFound !== 0) {
          return response.data.docs[0].author_key[0];
        } else {
          this.setState({
            searchError: {
              switch: true,
              msg: 'Author may be spelt wrong or doesnt exist',
            },
            loading: false,
          });
        }

        console.log(response);
      })
      .then(response => {
        console.log(response);
        axios
          .get(`http://openlibrary.org/authors/${response}.json`)
          .then(response => {
            if (typeof response.data.bio === 'object') {
              this.setState({
                first_name: response.data.name,
                family_name: response.data.name,
                bio: response.data.bio.value,
                date_of_birth: response.data.birth_date,
                date_of_death: response.data.death_date,
                loading: false,
              });
            } else {
              this.setState({
                first_name: response.data.name,
                family_name: response.data.name,
                bio: response.data.bio,
                date_of_birth: response.data.birth_date,
                date_of_death: response.data.death_date,
                loading: false,
              });
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getAuthor = id => {
    axios({
      method: 'get',
      url: `/catalog/author/${id}`,
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      console.log(response.data);
      this.setState(
        {
          first_name: response.data.author.first_name,
          family_name: response.data.author.family_name,
          bio: response.data.author.bio,
          date_of_birth: response.data.author.date_of_birth,
          date_of_death: response.data.author.date_of_death,
        },
        () => {
          console.log(this.state.bio);
        },
      );
    });
  };

  handleEdit = id => {
    axios({
      method: 'put',
      url: `/catalog/author/${id}`,
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
      this.setState(
        {
          visibleMessage: true,
          error: response.data.message,
          first_name: '',
          family_name: '',
          bio: '',
          date_of_birth: '',
          date_of_death: '',
        },
        () => {
          setTimeout(() => {
            this.setState({ visibleMessage: false });
          }, 3000);
        },
      );

      this.loadAuthors();
    });
  };

  handleDismiss = () => this.setState({ visibleMessage: false });

  confirmDelete(id) {
    axios({
      url: `/catalog/author/${id}`,
      method: 'delete',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      // console.log(response);
      this.loadAuthors();
    });
  }

  componentDidMount() {
    this.loadAuthors();
    // this.searchAuthor();
  }
  render() {
    const { authors, modalOpen } = this.state;
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
                    author={{
                      first_name: this.state.first_name,
                      family_name: this.state.family_name,
                      bio: this.state.bio,
                      date_of_birth: this.state.date_of_birth,
                      date_of_death: this.state.date_of_death,
                    }}
                    searchError={this.state.searchError}
                    loading={this.state.loading}
                    searchAuthor={this.searchAuthor}
                    onSubmit={this.handleCreate}
                    actionname="Create"
                    color="blue"
                    onChange={this.handleChange}
                  />
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment>
          <Table celled striped singleLine fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Bio</Table.HeaderCell>
                <Table.HeaderCell>Birthday</Table.HeaderCell>
                <Table.HeaderCell>Death Day</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {authors && Object.keys(authors).length !== 0 ? (
                authors.map(author => {
                  return (
                    <Table.Row key={author._id}>
                      <Table.Cell>{author.fullname}</Table.Cell>
                      <Table.Cell>{author.bio}</Table.Cell>
                      <Table.Cell>{author.date_of_birth_formatted}</Table.Cell>
                      <Table.Cell>{author.date_of_death_formatted}</Table.Cell>
                      <Table.Cell selectable warning>
                        <Modal
                          size="tiny"
                          closeIcon
                          trigger={
                            <a
                              className="fakeBtn"
                              onClick={() => this.getAuthor(author._id)}
                            >
                              Edit
                            </a>
                          }
                        >
                          <Header
                            icon="add"
                            content={`Edit ${author.fullname}`}
                          />
                          <Modal.Content>
                            <AuthorForm
                              author={{
                                first_name: this.state.first_name,
                                family_name: this.state.family_name,
                                bio: this.state.bio,
                                date_of_birth: this.state.date_of_birth,
                                date_of_death: this.state.date_of_death,
                              }}
                              onDismiss={this.handleDismiss}
                              visibleMessage={this.state.visibleMessage}
                              searchError={this.state.searchError}
                              loading={this.state.loading}
                              onSubmit={() => this.handleEdit(author._id)}
                              actionname="Edit"
                              color="green"
                              onChange={this.handleChange}
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
                            content={`Delete ${author.fullname}`}
                          />
                          <Modal.Content>
                            <p>
                              Are you sure you want to delete {author.fullname}{' '}
                              ?
                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              color="red"
                              inverted
                              onClick={() => this.confirmDelete(author._id)}
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
