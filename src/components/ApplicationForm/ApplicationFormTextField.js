import React from 'react';
import '../../scss/components/applicationform/applicationform.scss';

export function ApplicationFormTextField(props) {
  return (
    <input {...props} className="applicationform__input" />
  );
}
