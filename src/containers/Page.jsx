import React, { Component } from 'react';
import '../css/containers/page.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class _Page extends Component {

  constructor(props) {
    super(props);
    this.state = { change: false }
  }

  componentDidUpdate(prevProps) {
    const { location, willChange } = this.props;
    const { change } = this.state;

    if (!change && prevProps.willChange !== willChange) {
      this.setState({ change: true });
    }
    if (change && prevProps.location.pathname !== location.pathname) {
      this.setState({ change: false });
    }
  }

  render() {
    const { title, children } = this.props;
    const { change } = this.state;

    return <main className={`page${change? " page--exit": ""}`}>
      <h1 className="page__header">{ title }</h1>
      { children }
    </main>
  }
}

const mapStateToProps = state => ({
  willChange: state.page.willChange,
  index: state.sidenav.index
});
export const Page = withRouter(connect(mapStateToProps)(_Page));