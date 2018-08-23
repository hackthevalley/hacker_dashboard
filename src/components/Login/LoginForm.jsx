import React from 'react';
import { LoginFormItem } from './';

export class LoginForm extends React.Component {
  render() {
    const { block, button, items } = this.props;
    return <form className={`${block}__form`}>
      {
        items.map((props, key) => 
          <LoginFormItem key={ key } block={block} { ...props }/>
        )
      }
      <button className={`${block}__button`} type="submit">{ button }</button>
    </form>
  }
}