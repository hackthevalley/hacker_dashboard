import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectSession } from '../selectors';
import { isSessionEqual } from '../helpers';

class _IsLoggedIn extends Component {
  componentDidMount() {
    this.handleSessionChange(this.props.session)
  }

  componentWillReceiveProps(nextProps) {
    if (!isSessionEqual(this.props.session, nextProps.session)) {
      this.handleSessionChange(nextProps.session)
    }
  }

  handleSessionChange = (session) => {
    const {
      history,
      location,
    } = this.props;
    if ((!session || !session.token_body) && location.pathname !== '/') {
      history.replace('/');
    }
  }

  render() {
    return <Fragment>
      { this.props.children }
    </Fragment>
  }
}

export const IsLoggedIn = withRouter(connect(state => ({
  session: selectSession(state),
}))(_IsLoggedIn));
