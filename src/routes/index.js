import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import Search from '../components/Search';
import Form from "../components/Form";


const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App} >
      <IndexRoute component={Form}/>
      <Route path="/search" component={Search} />
    </Route>

    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
