import React, { Component, Fragment } from 'react';
import { Sidenav } from '../components';
import { Page } from './';
import '../css/containers/app.css';

export class App extends Component {
  render() {
    return <Fragment>
      <Sidenav/>
      <Page/>
    </Fragment>;
  }
}
