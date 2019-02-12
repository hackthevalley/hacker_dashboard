/*
 * Copyright (c) Hack the Valley All Rights Reserved.
 * License granted under MIT.
 * Author(s):
 *  Jun Zheng - me at jackzh dot com
 *  Fredric Pun
 *  Omar Chehab
 */

import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  padding: 70px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: block;
  height: auto !important;
`;

export class ApplicationClosed extends Component {
  render() {
    return (
      <Container>
        <h1>Application Closed</h1>
        <br/>
        <p>Application for HTV III is closed. We are currently reviewing all applications, you will receive an email once a decision has been made.</p>
        <br/>
        <h2>Acceptances</h2>
        <br/>
        <p>🙌 We have sent out all acceptances! <b>Please check your spam folder, sometimes the acceptance email goes to spam.</b></p>
        <br/>
        <p>If you did not receive an acceptance, please be patient, there is still a chance to get in if someone declines their invitation.</p>
        <br/>
        <p>You can also login to <a href="https://acceptance.hackthevalley.io">acceptance.hackthevalley.io</a> to check you acceptance details!</p>
      </Container>
    )
  }
}
