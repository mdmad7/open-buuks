import React from 'react';
import { Search } from 'semantic-ui-react';

const SearchBar = ({
  isLoading,
  results,
  value,
  resetComponent,
  handleResultSelect,
  handleSearchChange,
  resultRenderer,
}) => {
  return (
    <Search
      placeholder="Search book by title"
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      resultRenderer={resultRenderer}
    />
  );
};

export default SearchBar;
