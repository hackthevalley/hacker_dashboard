import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
    const { history, to, onStart, onEnd, delay = 0 } = this.props;
    e.preventDefault();
    if (onStart) { onStart(); }
    if (timer) { window.clearTimeout(timer); timer = null }
    timer = window.setTimeout(() => {
      if (onEnd) { onEnd(); }
      history.push(to);
    }, delay);
  }
}

export const DelayedLink = withRouter(_DelayedLink);