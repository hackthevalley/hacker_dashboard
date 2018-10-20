import React from 'react';

export function ApplicationFormSelectField(props) {
  return (
    <select {...props}>
      {props.options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
