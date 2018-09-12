import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard, Login } from './../pages';
import { IsLoggedIn, IsNotLoggedIn } from '../containers';
import '../css/containers/app.css';

function requireLoggedIn(SomeComponent) {
  return () => (
    <IsLoggedIn>
      <SomeComponent />
    </IsLoggedIn>
  )
}

function requireNotLoggedIn(SomeComponent) {
  return () => (
    <IsNotLoggedIn>
      <SomeComponent />
    </IsNotLoggedIn>
  )
}

export class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={requireNotLoggedIn(Login)}/>
        <Route exact path="/home" component={requireLoggedIn(Dashboard)}/>
        <Route exact path="/profile" component={requireLoggedIn(Dashboard)}/>
        <Route exact path="/app" component={requireLoggedIn(Dashboard)}/>
        <Route exact path="/faq" component={requireLoggedIn(Dashboard)}/>
        <Route exact path="/contact" component={requireLoggedIn(Dashboard)}/>
      </Switch>
    );
  }
}
