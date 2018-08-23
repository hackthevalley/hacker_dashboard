import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/components/sidenav/sidenavitem.css';

export class SidenavItem extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const { path, text, click, active } = this.props;
    return <li onClick={click} className={`sidenav__item${active? " sidenav__item--active": ""}`}>
      <Link to={path} className="sidenav__item-text">{ text }</Link>
    </li>
  }
}