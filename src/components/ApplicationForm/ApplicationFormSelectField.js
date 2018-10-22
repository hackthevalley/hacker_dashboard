import React from 'react';
import '../../scss/components/applicationform/applicationform.scss';

export function ApplicationFormSelectField(props) {
  return (
    <select {...props} className="applicationform__input">
      {props.options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
