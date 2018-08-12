import React, { Component } from 'react';
import '../../css/components/sidenav/sidenavitem.css';

export class SidenavItem extends Component {
  render() {
    const { path, text, icon } = this.props;
    return <li className="sidenav__item">
      <i 
      tabIndex="0" 
      onClick={ path } 
      onKeyPress={ path } 
      className="sidenav__icon material-icons"
      >
        { icon }
      </i>
      <p className="sidenav__text">{ text }</p>
    </li>
  }
}