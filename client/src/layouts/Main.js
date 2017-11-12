import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from './Dashboard';

// import AuthorPage from '../pages/dashboard/Author';
// import BookPage from '../pages/dashboard/Book';
// import BookInstancePage from '../pages/dashboard/Bookinstance';

const Main = () => {
  return (
    <div className="main-body">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={Login} />
        <Route path="/dashboard" component={Dashboard} />>
        {/* <Route exact path="/dashboard/author" component={AuthorPage} />
        <Route exact path="/dashboard/book" component={BookPage} />
        <Route
          exact
          path="/dashboard/bookinstance"
          component={BookInstancePage}
        /> */}
      </Switch>
    </div>
  );
};

export default Main;
