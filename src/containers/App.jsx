import React, { Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import localforage from 'localforage';
import { Dashboard, Login } from './../pages';
import { IsLoggedIn, IsNotLoggedIn } from '../containers';
import '../css/containers/app.css';
import { setSessionAction } from '../redux/actions';

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

class _App extends Component {
  state = {
    rehydrating: true,
  }

  componentDidMount() {
    this.rehydrateSession();
  }

  rehydrateSession = async () => {
    const {
      dispatch,
    } = this.props;
    try {
      const [
        email_address,
        token_body,
      ] = await Promise.all([
        localforage.getItem('email_address'),
        localforage.getItem('token_body'),
      ]);
      if (email_address && token_body) {
        dispatch(setSessionAction(email_address, token_body));
      }
    } catch (err) {
      throw err;
    } finally {
      this.setState({
        rehydrating: false,
      })
    }
  }

  render() {
    const { rehydrating } = this.state;
    if (rehydrating) {
      return null;
    }
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

export const App = withRouter(connect()(_App))
