import React from 'react';
import { ErrorCodes } from '../ErrorCodes';
import { LoginFormItem } from './';

export class LoginForm extends React.Component {
  render() {
    const {
      block,
      button,
      items,
      errorCodes,
      ...remainingProps
    } = this.props;
    return <form
      className={`${block}__form`}
      {...remainingProps}
    >
      {
        items.map((props, key) =>
          <LoginFormItem key={ key } block={block} { ...props }/>
        )
      }
      <button className={`${block}__button`} type="submit">{ button }</button>
      <ErrorCodes errorCodes={errorCodes} />
    </form>
  }
}
