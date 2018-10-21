import React from 'react';
import '../../scss/components/applicationform/applicationform.scss';

export function ApplicationFormTextAreaField(props) {
  return (
    <textarea {...props} className="applicationform__input applicationform__input--textarea" />
  );
}
