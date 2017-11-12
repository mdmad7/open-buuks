import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthorPage from '../pages/dashboard/Author';
import BookPage from '../pages/dashboard/Book';
import BookInstancePage from '../pages/dashboard/Bookinstance';
import HomePage from '../pages/dashboard/Home';

const Dashboard = () => {
  return (
    <div className="">
      <Switch>
        <Route exact path="/dashboard" component={HomePage} />
        <Route path="/dashboard/author" component={AuthorPage} />
        <Route path="/dashboard/book" component={BookPage} />
        <Route path="/dashboard/bookinstance" component={BookInstancePage} />
      </Switch>
      <p>SideBArd</p>
    </div>
  );
};

export default Dashboard;
