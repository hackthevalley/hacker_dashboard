import React, { Fragment } from 'react';

export function ApplicationFormRadioField({
  options,
  defaultValue,
  ...remainingProps
}) {
  return (
    <Fragment>
      {options.map(option => (
        <label key={option}>
          <input
            {...remainingProps}
            value={option}
            defaultChecked={defaultValue === option}
          /> {option} &nbsp;&nbsp;
        </label>
      ))}
    </Fragment>
  );
}
