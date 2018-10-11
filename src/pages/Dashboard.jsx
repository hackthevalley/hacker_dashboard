import React, { Component, Fragment } from 'react';
import { Sidenav } from './../components';
import { Page } from './../containers';

export class Dashboard extends Component {

  render() {
    const { children, title } = this.props;
    return <Fragment>
      <Sidenav/>
      <Page title={title}>
        { children }
      </Page>
    </Fragment>
  }
}