import React from 'react';
import { Link } from 'react-router-dom';
import './Account-Login.css';
import AuthHelper from '../../Helpers/Auth';
import Context from '../../Components/Context/Context';

export default class Login extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = { error: null };

  onLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/Home';
    history.push(destination);
  };

  loginSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;
    AuthHelper.login({
      username: username.value.toLowerCase(),
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        this.context.saveAuthToken(res.authToken);
        this.onLoginSuccess();
        this.context.onLogin();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className='Login'>
        <header className='Login-Header'></header>
        <h4 className='errorHandlerLogin'>{this.state.error}</h4>
        <form className='Login-Form' onSubmit={this.loginSubmit}>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              name='username'
              placeholder='Username'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Username</span>
            </span>
          </label>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              name='password'
              type='password'
              placeholder='Password'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Password</span>
            </span>
          </label>
          <div className='btn-row'>
            <button className='submitLogin'>Login</button>
            <Link to='/Create-Account'>
              <button className='newAccount'>Don't have an account?</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
