import React from 'react';
import { connect } from 'react-redux';
import '../css/pages/login.css';
import { LoginForm } from '../components';
import { createHackerTokenAction } from '../redux/actions';

const LOGIN_ITEMS = [
  {
    id: "login__email", label: "Email", type: "email",
    inputProps: {
      name: 'email_address',
      required: true,
      autoComplete: "email",
    },
  },
  {
    id: "login__password", label: "Password", type: "password",
    inputProps: {
      name: 'password',
      required: true,
      autoComplete: "current-password",
    },
  },
];

const REG_ITEMS = [
  {id: "reg__email", label: "Email", type: "email"},
  {id: "reg__password", label: "Password", type: "password"},
  {id: "reg__comfrim", label: "Confirm Password", type: "password"}
]

class _Login extends React.Component {
  state = {
    loginErrorCodes: false,
  }

  handleLogin = async (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    const formData = new FormData(event.target);
    const email_address = formData.get('email_address');
    const password = formData.get('password');
    this.setState({
      loginErrorCodes: false,
    });
    const action = await dispatch(createHackerTokenAction(email_address, password));
    if (action.error) {
      this.setState({
        loginErrorCodes: action.error.errorCodes,
      });
      return;
    }
  }

  render() {
    const {
      loginErrorCodes,
    } = this.state;
    return (
      <main className="login">
        <section className="login__section login__section--login">
          <div className="login__head">
            <h1 className="login__header">Hack The Valley III</h1>
            <span className="login__subheader">Dashboard</span>
          </div>
          <h2 className="login__form-header">Login</h2>
          <LoginForm
            block="login"
            button="Login"
            items={LOGIN_ITEMS}
            onSubmit={this.handleLogin}
            errorCodes={loginErrorCodes}
          />
        </section>
        <section className="login__section login__section--register">
          <h2 className="login__form-header">Register</h2>
          <div className="login__wrapper--register">
            <h3 className="login__form-subheader">First Time Applying? Let's Get Started!</h3>
            <p className="login__form-text">We remember your account so never have make another one again.</p>
            <p className="login__form-text">Re-applying is just a simple update and submission.</p>
          </div>
          <LoginForm block="login" button="Next Steps" items={REG_ITEMS}/>
        </section>
      </main>
    );
  }
}

export const Login = connect()(_Login);
