import React from 'react';
import PropTypes from 'prop-types';
import errorCodeToMessageMap from './errorCodeToMessageMap.json';
import '../../scss/components/errorcodes/errorcodes.scss';

export class ErrorCodes extends React.Component {
  static propTypes = {
    errorCodes: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    errorCodes: [],
  }

  render() {
    const { errorCodes } = this.props;

    if (errorCodes === false) {
      return null;
    }

    return (
      <div className={`errorcodes${errorCodes.length === 0? " errorcides--empty": ""}`}>
        {errorCodes.map(errorCode => (
          <p
            key={errorCode}
            className='errorcodes__error'
          >
            {errorCodeToMessageMap[errorCode] || errorCode}
          </p>
        ))}
      </div>
    );
  }
}
