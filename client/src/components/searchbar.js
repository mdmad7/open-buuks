import React, { Component } from 'react';
import { Typeahead } from 'react-typeahead';

class SearchBar extends Component {
  render() {
    return (
      // <input
      //   className="search_bar_big"
      //   type="text"
      //   placeholder="search author, book or genre"
      // />

      <Typeahead />
    );
  }
}

export default SearchBar;
