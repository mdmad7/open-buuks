import React, { Component } from 'react';
import { Typeahead } from 'react-typeahead';

class SearchBar extends Component {
  render() {
    return (
      <Typeahead
        options={['John', 'Paul', 'George', 'Ringo', 'James', 'Jimmy']}
        maxVisible={3}
        placeholder="search author, book and genre"
      />
    );
  }
}

export default SearchBar;
