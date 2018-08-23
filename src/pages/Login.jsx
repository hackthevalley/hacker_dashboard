import React from 'react';
import '../css/pages/login.css';

export class Login extends React.Component {
  render() {
    return <main className="login">
      <section className="login__section login__section--login">
        <div className="login__head">
          <h1 className="login__header">Hack The Valley III</h1>
          <span className="login__subheader">Dashboard</span>
        </div>
        <h2 className="login__form-header">Login</h2>
        <form className="login__form">
          <div className="login__item">
            <label className="login__label" htmlfor="#login__email">Login</label>
            <input id="login__email" className="login__input"/>
          </div>
          <div className="login__item">
            <label className="login__label" htmlfor="#login__password">Password</label>
            <input id="login__password" className="login__input"/>
          </div>
          <button className="login__button" type="submit">Login</button>
        </form>
      </section>
      <section className="login__section login__section--register">
        <h2 className="login__form-header">Register</h2>
      </section>
    </main>
  }
}