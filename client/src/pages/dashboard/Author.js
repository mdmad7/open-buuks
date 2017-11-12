import React from 'react';
import withAuth from '../../components/withAuthHOC';

const AuthorPage = () => {
  return (
    <div>
      <h2>Author Page</h2>
    </div>
  );
};

export default withAuth(AuthorPage);
