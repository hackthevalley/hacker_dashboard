/*
 * Copyright (c) Hack the Valley All Rights Reserved.
 * License granted under MIT.
 * Author(s):
 *  Jun Zheng - me at jackzh dot com
 *  Fredric Pun
 *  Omar Chehab
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import "../../scss/components/navigations/navigations.scss";

/**
 * Component for back button on the top left corner
 */
class _BackButton extends Component {

  static propTypes = {
    to: PropTypes.string,
    text: PropTypes.string
  };

  render() {
    return (
      <Link
        className="navigation__back-btn"
        to={this.props.to}
      >
        <i className="fa fa-caret-left" aria-hidden="true"/> {this.props.text}
      </Link>
    )
  }
}

export const BackButton = _BackButton;
