import React from 'react';
import withAuth from '../../components/withAuthHOC';

const BookPage = () => {
  return (
    <div>
      <h2>Book Page</h2>
    </div>
  );
};

export default withAuth(BookPage);
