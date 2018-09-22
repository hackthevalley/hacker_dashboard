import React from 'react';
import PropTypes from 'prop-types';
import errorCodeToMessageMap from './errorCodeToMessageMap.json';
import '../../css/components/errorcodes/errorcodes.css';

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
      <div className='ErrorCodes'>
        {errorCodes.map(errorCode => (
          <p
            key={errorCode}
            className='ErrorCodes--error'
          >
            {errorCodeToMessageMap[errorCode] || errorCode}
          </p>
        ))}
      </div>
    );
  }
}
