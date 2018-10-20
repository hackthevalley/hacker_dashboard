import React, { Component } from 'react';
import { DelayedLink } from '../';
import '../../scss/components/sidenav/sidenavitem.scss';

export class SidenavItem extends Component {
  render() {
    const { path, children, onStart, onEnd, active } = this.props;
    return <li className={`sidenav__item${active? " sidenav__item--active": ""}`}>
      <DelayedLink delay={600} onStart={onStart} onEnd={onEnd} to={path} className="sidenav__item-text">
        { children }
      </DelayedLink>
    </li>
  }

  start = () => this.props.onStart
}

