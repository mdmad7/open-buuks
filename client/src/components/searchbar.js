import React, { Component } from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: null,
      results: [],
      isLoading: false,
      value: '',
    };
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.books, isMatch),
      });
    }, 500);
  };

  loadBooks = () => {
    axios({
      method: 'get',
      url: '/catalog/books/search',
    }).then(response => {
      this.setState(
        {
          books: response.data,
        },
        () => {
          console.log(this.state.books);
        },
      );
    });
  };

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
      />
    );
  }
}

export default SearchBar;
