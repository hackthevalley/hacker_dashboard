import React, { Component } from 'react';
import { DelayedLink } from '../';
import '../../css/components/sidenav/sidenavitem.css';

export class SidenavItem extends Component {
  render() {
    const { path, text, click, active, noPush = false } = this.props;
    return <li className={`sidenav__item${active? " sidenav__item--active": ""}`}>
      <DelayedLink delay={800} onClick={click} to={path} className="sidenav__item-text" noPush={noPush}>
        { text }
      </DelayedLink>
    </li>
  }
}

