import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './stylesheets/main.css';
const NonBlockApp = withRouter(App);

ReactDOM.render(
  <Router>
    <NonBlockApp />
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
