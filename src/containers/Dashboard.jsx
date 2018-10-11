import React, { Component } from 'react';
import { Sidenav } from './../components';
import { Page, IsLoggedIn } from '.';

export class Dashboard extends Component {

  render() {
    const { children } = this.props;
    return <IsLoggedIn>
      <Sidenav/>
      <Page>
        { children }
      </Page>
    </IsLoggedIn>
  }
}