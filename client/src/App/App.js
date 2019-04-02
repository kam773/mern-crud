import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

import CreateStudent from '../components/CreateStudent/CreateStudent';
import EditStudent from '../components/EditStuent/EditStudent';
import StudentList from '../components/StudentList/StudentList';
import Navigation from '../components/Navigation/Navigation';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Switch>
          <Route path="/" exact component={StudentList} />
          <Route path="/create" component={CreateStudent} />
          <Route path="/edit/:id" component={EditStudent} />
        </Switch>
      </React.Fragment>
    );
  }
}

