import React from 'react';
import { Router, Route, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {

  return (
    <Router history={history}>
      <Route path="/"   component={IndexPage} />
      
    </Router>
  );
}

export default RouterConfig;
