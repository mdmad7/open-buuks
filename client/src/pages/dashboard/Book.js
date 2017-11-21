import React, { Component } from 'react';
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
import BookForm from '../../components/dashboard/book-form';

class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: null,
      authors: null,
      books: null,
      modalOpen: false,
      error: null,
      visibleMessage: false,
      loading: false,
      searchResult: null,
      searchError: {
        switch: false,
        msg: '',
      },
    };

    // this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleDropdownChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      searchError: { switch: false, msg: '' },
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
      url: '/catalog/book',
      data: {
        title: this.state.title,
        author: this.state.book_author,
        summary: this.state.summary,
        isbn: this.state.isbn,
        genre: this.state.genre_array,
        publisher: this.state.publisher,
        year_of_publication: this.state.year_of_publication,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState({
        title: '',
        book_author: '',
        summary: '',
        isbn: '',
        genre_array: [''],
        publisher: '',
        year_of_publication: '',
        error: response.data.message,
      });

      this.state.error ? console.log() : this.handleModalClose();
      this.loadBooks();
    });
  };

  handleModalOpen = () => this.setState({ modalOpen: true });
  handleModalClose = () => this.setState({ modalOpen: false });

  getBook = id => {
    axios({
      method: 'get',
      url: `/catalog/book/${id}`,
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    })
      .then(response => {
        // console.log(response.data.book.genre);
        let selectedGenres = [];
        response.data.book.genre.forEach(gen => {
          selectedGenres.push(gen._id);
        });

        this.setState(
          {
            title: response.data.book.title,
            book_author: response.data.book.author.id,
            isbn: response.data.book.isbn,
            summary: response.data.book.summary,
            genre_array: selectedGenres,
            publisher: response.data.book.publisher,
            year_of_publication: response.data.book.year_of_publication,
          },
          () => {
            // console.log(this.state.genre_array);
          },
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleEdit = id => {
    axios({
      method: 'put',
      url: `/catalog/book/${id}`,
      data: {
        title: this.state.title,
        author: this.state.book_author,
        summary: this.state.summary,
        isbn: this.state.isbn,
        genre: this.state.genre_array,
        publisher: this.state.publisher,
        year_of_publication: this.state.year_of_publication,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      this.setState(
        {
          visibleMessage: true,
          error: response.data.message,
          title: '',
          book_author: '',
          summary: '',
          isbn: '',
          publisher: '',
          year_of_publication: '',
          genre_array: [],
        },
        () => {
          setTimeout(() => {
            this.setState({ visibleMessage: false });
          }, 3000);
        },
      );

      this.loadBooks();
    });
  };

  handleDismiss = () => this.setState({ visibleMessage: false });

  confirmDelete(id) {
    axios({
      url: `/catalog/book/${id}`,
      method: 'delete',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      // console.log(response);
      this.loadBooks();
    });
  }

  searchBook = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let isbn = `ISBN:${this.state.isbnsearch}`;
    axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=${isbn}&jscmd=details&format=json`,
      )
      .then(response => {
        console.log(response);
        if (Object.keys(response.data).length !== 0) {
          this.setState({ loading: false });
          let results = response.data;
          Object.keys(results).forEach(details => {
            this.setState(
              {
                searchResult: results[details],
                title: results[details].details.title,
                book_author: '',
                genre_array: [],
                summary: results[details].details.description
                  ? results[details].details.description.value
                  : '',
                publisher: results[details].details.publishers[0],
                year_of_publication: results[details].details.publish_date,
                isbn: results[details].details.isbn_10
                  ? results[details].details.isbn_10[0]
                  : results[details].details.isbn_13[0],
              },
              () => {
                console.log(this.state.publisher);
              },
            );
          });
        } else {
          this.setState(
            {
              title: '',
              summary: '',
              isbn: '',
              publisher: '',
              year_of_publication: '',
              book_author: '',
              genre_array: '',
              searchError: {
                switch: true,
                msg:
                  'ISBN may be wrong or doesnt exist. ISBN 10 is preferrable',
              },
              loading: false,
            },
            () => {
              console.log(this.state.searchError);
            },
          );
        }
      });
  };

  loadAuthors = () => {
    axios({
      method: 'get',
      url: '/catalog/authors',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      let copy = [];
      response.data.forEach(author => {
        let newAuthor = {
          key: author._id,
          text: author.fullname,
          value: author._id,
        };
        copy.push(newAuthor);
      });
      this.setState({
        authors: copy,
      });
    });
  };

  loadGenres = () => {
    axios({
      method: 'get',
      url: '/catalog/genres',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      let copy = [];
      response.data.forEach(genre => {
        let newGenre = {
          key: genre._id,
          text: genre.name,
          value: genre._id,
        };
        copy.push(newGenre);
      });
      this.setState({
        genres: copy,
      });
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
      // console.log(response.data);
      this.setState({
        books: response.data,
      });
    });
  };

  componentWillMount() {
    this.loadBooks();
  }

  render() {
    const { books, error, modalOpen } = this.state;
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
                    onClick={() => {
                      this.handleModalOpen();
                      this.loadAuthors();
                      this.loadGenres();
                    }}
                    primary
                    content="Add"
                    icon="add"
                    labelPosition="left"
                  />
                }
              >
                <Header icon="add" content="Create Book" />
                <Modal.Content>
                  <BookForm
                    authors={this.state.authors}
                    genres={this.state.genres}
                    book={{
                      title: this.state.title,
                      author: this.state.book_author,
                      isbn: this.state.isbn,
                      summary: this.state.summary,
                      genre_array: this.state.genre_array,
                      publisher: this.state.publisher,
                      year_of_publication: this.state.year_of_publication,
                    }}
                    handleDropdownChange={this.handleDropdownChange}
                    searchError={this.state.searchError}
                    loading={this.state.loading}
                    searchBook={this.searchBook}
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
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Summary</Table.HeaderCell>
                <Table.HeaderCell>ISBN</Table.HeaderCell>
                <Table.HeaderCell>Genres</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {books && Object.keys(books).length !== 0 ? (
                books.map(book => {
                  return (
                    <Table.Row key={book.id}>
                      <Table.Cell>{book.title}</Table.Cell>
                      <Table.Cell>{book.author.fullname}</Table.Cell>
                      <Table.Cell>{book.summary}</Table.Cell>
                      <Table.Cell>{book.isbn}</Table.Cell>
                      <Table.Cell>
                        {book.genre.map(g => {
                          return <span key={g._id}>{g.name}, </span>;
                        })}
                      </Table.Cell>
                      <Table.Cell selectable warning>
                        <Modal
                          size="tiny"
                          closeIcon
                          trigger={
                            <a
                              onClick={() => {
                                this.loadAuthors();
                                this.loadGenres();
                                this.getBook(book._id);
                              }}
                              className="fakeBtn"
                            >
                              Edit
                            </a>
                          }
                        >
                          <Header icon="add" content={`Edit ${book.title}`} />
                          <Modal.Content>
                            <BookForm
                              authors={this.state.authors}
                              genres={this.state.genres}
                              error={error}
                              onSubmit={() => this.handleEdit(book._id)}
                              actionname="Edit"
                              color="green"
                              handleDropdownChange={this.handleDropdownChange}
                              onChange={this.handleChange}
                              book={{
                                id: book._id,
                                title: this.state.title,
                                author: this.state.book_author,
                                isbn: this.state.isbn,
                                summary: this.state.summary,
                                genre_array: this.state.genre_array,
                                publisher: this.state.publisher,
                                year_of_publication: this.state
                                  .year_of_publication,
                              }}
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
                            content={`Delete ${book.title}`}
                          />
                          <Modal.Content>
                            <p>
                              Are you sure you want to delete {book.title} by{' '}
                              {book.author.fullname}?
                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              color="red"
                              inverted
                              onClick={() => this.confirmDelete(book._id)}
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
                  <Table.Cell>No Books Available</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default BookPage;
