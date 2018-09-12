import React from 'react';

export class LoginFormItem extends React.Component {
  static defaultProps = {
    inputProps: {},
  }

  render() {
    const {
      id,
      label,
      type,
      block,
      inputProps,
    } = this.props;
    return <div className={`${block}__item`}>
      <label className={`${block}__label`} htmlfor={`#${id}`}>{ label }</label>
      <input
        id={id}
        type={type ? type : "text"}
        className={`${block}__input`}
        {...inputProps}
      />
    </div>
  }
}
