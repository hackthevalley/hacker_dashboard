import React, { Component, Fragment } from 'react';
import { Sidenav } from './../components';
import { Page } from './../containers';

export class Dashboard extends Component {

  render() {
    const { children } = this.props;
    return <Fragment>
      <Sidenav/>
      <Page title="Something">
        { children }
      </Page>
    </Fragment>
  }
}