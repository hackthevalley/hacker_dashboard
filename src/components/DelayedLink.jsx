import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pageTransition } from '../redux/actions';

let timer;
class _DelayedLink extends React.Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  render() {
    const { className, children, to } = this.props;
    return <Link onClick={this.click} to={to} className={className}>
      { children }
    </Link>
  }

  click(e) {
    const { history, to, onClick, pageTransition, delay = 0 } = this.props;
    e.preventDefault();
    if (onClick) {
      if (timer) { window.clearTimeout(timer); timer = null }
      onClick();
      pageTransition();
      timer = window.setTimeout(() => history.push(to), delay);
    }
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  pageTransition
}, dispatch);

export const DelayedLink = withRouter(connect(null, mapDispatchToProps)(_DelayedLink));