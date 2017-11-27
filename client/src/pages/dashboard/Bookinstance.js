import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {
  Grid,
  Modal,
  Header,
  Button,
  Table,
  Segment,
  Icon,
} from 'semantic-ui-react';
import BookInstanceForm from '../../components/dashboard/bookinstance_form';
class BookInstancePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      direction: null,
      modalOpen: false,
      books: null,
      searchError: {
        switch: false,
        msg: '',
      },
      visibleMessage: false,
      error: null,
      loading: false,
      status_options: [
        { value: 'Maintenance', key: 'Maintenance', text: 'Maintenance' },
        { value: 'Loaned', key: 'Loaned', text: 'Loaned' },
        { value: 'Available', key: 'Available', text: 'Available' },
        { value: 'Reserved', key: 'Reserved', text: 'Reserved' },
      ],
    };
  }

  handleSort = clickedColumn => () => {
    const { column, bookinstances, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        bookinstances: _.sortBy(bookinstances, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      bookinstances: bookinstances.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  handleDropdownChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      searchError: { switch: false, msg: '' },
    });
  };

  handleEdit = id => {
    axios({
      method: 'put',
      url: `/catalog/bookinstance/${id}`,
      data: {
        book: this.state.book_choosen,
        status: this.state.status_choosen,
        due_back: this.state.due_back,
        with: this.state.with,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState(
        {
          visibleMessage: true,
          error: response.data.message,
          book_choosen: '',
          status_choosen: '',
          due_back: '',
        },
        () => {
          setTimeout(() => {
            this.setState({ visibleMessage: false });
          }, 3000);
        },
      );

      this.loadBookinstances();
    });
  };

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
      url: '/catalog/bookinstance',
      data: {
        book: this.state.book_choosen,
        status: this.state.status_choosen,
        due_back: this.state.due_back,
        with: this.state.with,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState({
        book: '',
        status: '',
        due_back: '',
        error: response.data.message,
      });

      this.state.error ? console.log() : this.handleModalClose();
      this.loadBookinstances();
    });
  };

  confirmDelete(id) {
    axios({
      url: `/catalog/bookinstance/${id}`,
      method: 'delete',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      // console.log(response);
      this.loadBookinstances();
    });
  }

  getBookinstance = id => {
    axios({
      method: 'get',
      url: `/catalog/bookinstance/${id}`,
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          book_choosen: response.data.book._id,
          status_choosen: response.data.status,
          due_back: response.data.due_back,
          with: response.data.with,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  loadBooks = () => {
    axios({
      method: 'get',
      url: '/catalog/books',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      let copy = [];
      response.data.forEach(book => {
        let newBook = {
          key: book._id,
          text: book.title,
          value: book._id,
        };
        copy.push(newBook);
      });
      this.setState({
        books: copy,
      });
    });
  };

  loadBookinstances = () => {
    axios({
      method: 'get',
      url: '/catalog/bookinstances',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      // console.log(response.data);
      this.setState(
        {
          bookinstances: response.data,
        },
        () => {
          console.log(this.state.bookinstances);
        },
      );
    });
  };

  componentDidMount() {
    this.loadBooks();
    this.loadBookinstances();
  }

  handleModalOpen = () => this.setState({ modalOpen: true });
  handleModalClose = () => this.setState({ modalOpen: false });
  handleDismiss = () => this.setState({ visibleMessage: false });

  render() {
    const { modalOpen, bookinstances, direction, column } = this.state;
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
                <Header icon="add" content="Create Book Instance" />
                <Modal.Content>
                  <BookInstanceForm
                    actionname="Create"
                    color="blue"
                    status={this.state.status_options}
                    books={this.state.books}
                    handleChange={this.handleChange}
                    handleDropdownChange={this.handleDropdownChange}
                    onSubmit={this.handleCreate}
                    bookinstance={{
                      book_id: this.state.book_choosen,
                      status: this.state.status_choosen,
                      due_back: this.state.due_back,
                      with: this.state.with,
                    }}
                  />
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment>
          <Table celled striped singleLine fixed sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'id' ? direction : null}
                  onClick={this.handleSort('id')}
                >
                  ID
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'book.title' ? direction : null}
                  onClick={this.handleSort('book.title')}
                >
                  Title
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'status' ? direction : null}
                  onClick={this.handleSort('status')}
                >
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'due_back' ? direction : null}
                  onClick={this.handleSort('due_back')}
                >
                  Due Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'with' ? direction : null}
                  onClick={this.handleSort('with')}
                >
                  Borrowed / Reserved By
                </Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {bookinstances && Object.keys(bookinstances).length !== 0 ? (
                bookinstances.map(bookinstance => {
                  return (
                    <Table.Row key={bookinstance.id}>
                      <Table.Cell>{bookinstance._id}</Table.Cell>
                      <Table.Cell>{bookinstance.book.title}</Table.Cell>
                      <Table.Cell>{bookinstance.status}</Table.Cell>
                      <Table.Cell>{bookinstance.due_back_formatted}</Table.Cell>
                      <Table.Cell>{bookinstance.with}</Table.Cell>
                      <Table.Cell selectable warning>
                        <Modal
                          size="tiny"
                          closeIcon
                          trigger={
                            <a
                              className="fakeBtn"
                              onClick={() => {
                                this.getBookinstance(bookinstance._id);
                              }}
                            >
                              Edit
                            </a>
                          }
                        >
                          <Header
                            icon="add"
                            content={`Edit ${bookinstance.book.title}`}
                          />
                          <Modal.Content>
                            <BookInstanceForm
                              actionname="Edit"
                              color="green"
                              status={this.state.status_options}
                              books={this.state.books}
                              handleChange={this.handleChange}
                              handleDropdownChange={this.handleDropdownChange}
                              bookinstance={{
                                id: bookinstance._id,
                                book_id: this.state.book_choosen,
                                status: this.state.status_choosen,
                                due_back: this.state.due_back,
                                with: this.state.with,
                              }}
                              onSubmit={() => this.handleEdit(bookinstance._id)}
                              visibleMessage={this.state.visibleMessage}
                              onDismiss={this.handleDismiss}
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
                            content={`Delete ${bookinstance.book.title}`}
                          />
                          <Modal.Content>
                            <p>
                              Are you sure you want to delete this copy of{' '}
                              {bookinstance.book.title}?
                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              color="red"
                              inverted
                              onClick={() =>
                                this.confirmDelete(bookinstance._id)
                              }
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
                  <Table.Cell>No Book Instances Available</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default BookInstancePage;
