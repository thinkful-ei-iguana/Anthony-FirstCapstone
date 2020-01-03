import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../Helpers/Auth';
import '../../Styles/Account-Creation.css';

export default class Login extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/login');
  };

  state = { error: null };

  createSubmit = ev => {
    ev.preventDefault();
    const { name, email, location, username, password, image } = ev.target;

    this.setState({ error: null });
    Auth.createAccount({
      name: name.value,
      email: email.value,
      location: location.value,
      username: username.value.toLowerCase(),
      password: password.value,
      avatar: image.value
    })
      .then(user => {
        name.value = '';
        email.value = '';
        location.value = '';
        username.value = '';
        password.value = '';
        image.value = '';
        this.handleRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className='Creation'>
        <header className='Creation-Header'></header>
        <form className='Creation-Form' onSubmit={this.createSubmit}>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              name='name'
              placeholder='Name'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Name</span>
            </span>
          </label>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              type='email'
              name='email'
              placeholder='Email'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Email</span>
            </span>
          </label>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              name='location'
              placeholder='Location'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Location</span>
            </span>
          </label>
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
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              type='text'
              name='image'
              placeholder='Avatar url'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Avatar url</span>
            </span>
          </label>
          <div className='btn-row'>
            <button className='submitLogin'>Create</button>
            <Link to='/Login'>
              <button className='newAccount'>Have an account?</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
