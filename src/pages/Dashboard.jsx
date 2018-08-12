import React, { Component, Fragment } from 'react';
import { Sidenav } from './../components';

export class Dashboard extends Component {
  render() {
    return <Fragment>
      <Sidenav/>
      <Page title="Something">
        GAINZ
      </Page>
    </Fragment>
  }
}