import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { moveHighlight } from '../../redux/actions';
import { SidenavItem } from './';
import '../../css/components/sidenav/sidenav.css';

const MAIN_ITEMS = [
  { path: "/home", text: "Home"},
  { path: "/profile", text: "Profile" },
  { path: "/app", text: "Application" }
];

const BOTTOM_ITEMS = [
  { path: "/faq", text: "FAQ" },
  { path: "/contact", text: "Contact" },
  { path: "/", text: "Logout" }
]

class _Sidenav extends Component {

  constructor(props) {
    super(props);
    const path = window.location.pathname.replace(process.env.PUBLIC_URL, "");
    const index = MAIN_ITEMS.map(({path}) => path).indexOf(path);
    this.props.moveHighlight(index);
  }

  render() {
    const { index } = this.props;
    const transform = `translate3d(0,calc(${index*100}% + ${index*10}px),0)`;

    return <nav className="sidenav">
      <div className="sidenav__brand">
        <span className="sidenav__header">Hack The Valley III</span>
        <span className="sidenav__subheader">Dashboard</span>
      </div>
      <ul className="sidenav__items sidenav__items--main">
        <div className={`sidenav__highlight${index === -1? "--hide": ""}`} style={{transform}}/>
        {
          MAIN_ITEMS.map((item, key) => 
            <SidenavItem active={index === key} click={this.click.bind(this, key)} key={key} {...item}/>
          )
        }
      </ul>
      <ul className="sidenav__items sidenav__items--bottom">
        {
          BOTTOM_ITEMS.map((item, key) => <SidenavItem click={this.click.bind(this, -1)} key={key} {...item}/>)
        }
      </ul>
    </nav>
  }

  click(key) {
    const { index, moveHighlight } = this.props;
    if (key !== index) {
      moveHighlight(key);
    }
  }
}

const mapStateToProps = state => ({
  index: state.sidenav.index
})

const mapDispatchToProps = dispatch => bindActionCreators({
  moveHighlight
}, dispatch)

export const Sidenav = connect(mapStateToProps, mapDispatchToProps)(_Sidenav)