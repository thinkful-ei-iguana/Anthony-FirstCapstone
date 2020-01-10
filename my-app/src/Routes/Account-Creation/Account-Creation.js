import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../Helpers/Auth';
import './Account-Creation.css';

export default class Login extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  // if creation was successful then pushes user to login
  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/login');
  };

  state = { error: null };

  // takes all the form data and uses a helper function to send the post api call
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
      avatar:
        image.value ||
        'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
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
        <header className='Creation-Header'>
          <h1>Create An Account</h1>
        </header>
        <h4 className='errorHandlerCreateAccount'>{this.state.error}</h4>
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
          <label className='field a-field a-field_a2 passwordSection'>
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
          <span className='passwordHint'>
            Must include 1 Uppercase, 1 Lowercase, 1 Special Character
          </span>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
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
