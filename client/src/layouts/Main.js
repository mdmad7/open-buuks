import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const Main = () => {
  return (
    <div className="main-body">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Main;
