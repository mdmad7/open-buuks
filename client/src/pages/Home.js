import React from 'react';
import SearchBar from '../components/searchbar';
import logo from '../images/logo.svg';

const Home = () => {
  return (
    <div className="home_page">
      <div className="search_div">
        <img src={logo} alt="open books" className="openbwks_logo" />
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
