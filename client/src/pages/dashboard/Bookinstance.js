import React from 'react';
import withAuth from '../../components/withAuthHOC';

const BookInstancePage = () => {
  return (
    <div>
      <h2>Book Instance Page</h2>
    </div>
  );
};

export default withAuth(BookInstancePage);
