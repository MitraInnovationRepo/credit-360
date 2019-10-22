import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { LandingPage } from '../LandingPage';
import { Dashboard } from '../Dashboard';

class AppContainer extends Component {
  render() {

    const { mobile } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={() => <LandingPage mobile={mobile} />} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export default AppContainer;
