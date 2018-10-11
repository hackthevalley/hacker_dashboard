import React, { Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import localforage from 'localforage';
import * as Pages from './../pages';
import { Dashboard } from '.';
import '../css/containers/app.css';
import { setSessionAction } from '../redux/actions';

const ROUTES = [
  { path: "/home", component: Pages.Home },
  { path: "/profile", component: Pages.Profile },
  { path: "/app", component: Pages.Application },
  { path: "/faq", component: Pages.Faq },
  { path: "/contact", component: Pages.Contact }
]

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
        <Route exact path="/" component={Pages.Login}/>
        <Dashboard>
          <Switch>
            { ROUTES.map((props, key) => <Route exact key={key} { ...props }/>) }
          </Switch>
        </Dashboard>
      </Switch>
    );
  }
}

export const App = withRouter(connect()(_App))
