import React, { Component } from 'react';
import {
  Button,
  Form,
  TextArea,
  Input,
  Icon,
  Dropdown,
} from 'semantic-ui-react';
import axios from 'axios';

class BookForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      summary: '',
      isbn: '',
      searched: null,
      loading: false,
      allAuthors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/catalog/authors',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    })
      .then(response => {
        console.log(response);
        this.setState({
          allAuthors: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ loading: true });
    let isbn = `ISBN:${document.getElementById('isbnSearch').value}`;
    axios
      .get(
        `https://openlibrary.org/api/books?bibkeys=${isbn}&jscmd=details&format=json`,
      )
      .then(response => {
        let results = response.data;
        Object.keys(results).forEach(details => {
          this.setState({
            searched: results[details],
            loading: false,
          });
        });

        // this.setState({
        //   searched: Object.values(response.data),
        // });
      });
  }

  render() {
    const { loading, searched } = this.state;
    return (
      <div>
        {console.log(searched)}
        <Form onSubmit={this.handleSearch}>
          <Form.Field>
            <Input
              icon={<Icon name="search" inverted circular link />}
              id="isbnSearch"
              name="isbn-search"
              placeholder="Enter ISBN..."
            />
            {/* <Form.Button>
              <Icon name="search" />
            </Form.Button> */}
          </Form.Field>
        </Form>
        <Form loading={loading}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Title"
              name="title"
              value={searched ? searched.details.title : ''}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input
              placeholder="Author"
              name="author"
              value={
                searched && searched.details.authors
                  ? searched.details.authors.map(author => author.name)
                  : ''
              }
              onChange={this.handleChange}
            />
          </Form.Field>
          <Dropdown
            options={this.state.allAuthors}
            placeholder="Choose Languages"
            search
            selection
            fluid
            multiple
            allowAdditions
            // value={this.state.allAuthors}
            // onAddItem={this.handleAddition}
            // onChange={this.handleChange}
          />
          <Form.Field>
            <label>ISBN</label>
            <input
              placeholder="ISBN"
              name="isbn"
              value={
                searched && searched.details.isbn_10
                  ? searched.details.isbn_10
                  : ''
              }
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Summary</label>
            <TextArea
              placeholder="Summary"
              name="summary"
              value={
                searched && searched.details.description
                  ? searched.details.description.value
                  : ''
              }
              autoHeight
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            {/* <Dropdown
              options={this.state.options}
              placeholder="Choose Languages"
              search
              selection
              fluid
              multiple
              allowAdditions
              value={currentValues}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            /> */}
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default BookForm;
