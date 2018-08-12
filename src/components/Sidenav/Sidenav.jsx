import React, { Component } from 'react';
import { SidenavItem } from './';
import '../../css/components/sidenav/sidenav.css';

const ITEMS = [
  { path: "/home", text: "Home", icon: "dashboard" },
  { path: "/home", text: "Profile", icon: "person" },
  { path: "/home", text: "Form", icon: "poll" },
  { path: "/home", text: "FAQ", icon: "help" },
];

export class Sidenav extends Component {
  render() {
    return <nav className="sidenav">
      <ul className="sidenav__items">
        {
          ITEMS.map((item, key) => 
            <SidenavItem key={ key } { ...item } path={ this.click.bind(this, item.path) }/>
          )
        }
      </ul>
    </nav>
  }

  click(path) {
    console.log(path);
  }
}