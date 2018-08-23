import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard, Login } from './../pages';
import '../css/containers/app.css';

export class App extends Component {
  render() {
    return <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Dashboard}/>
      <Route exact path="/profile" component={Dashboard}/>
      <Route exact path="/app" component={Dashboard}/>
      <Route exact path="/faq" component={Dashboard}/>
      <Route exact path="/contact" component={Dashboard}/>
    </Switch>;
  }
}
