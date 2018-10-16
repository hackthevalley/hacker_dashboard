import React from 'react';
import { ErrorCodes } from '../ErrorCodes';
import { LoginFormItem } from './';
import {connect} from "react-redux";

class _LoginForm extends React.Component {
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
      <button className={`${block}__button`} type="submit" disabled={this.props.fetching}>{ button }</button>
      <br/><br/>
      <ErrorCodes errorCodes={errorCodes} />
    </form>
  }
}

export const LoginForm = connect((state) => ({
    fetching: state.fetch.fetching
}))(_LoginForm);