import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../Helpers/Auth';
import '../../Styles/Account-Creation.css';
import Context from '../Context/Context';

export default class Login extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.name.value
    });
  };

  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push('/Login');
    }
    this.setState({
      name: this.context.currentUser.name,
      email: this.context.currentUser.email,
      location: this.context.currentUser.location,
      username: this.context.currentUser.username,
      avatar: this.context.currentUser.avatar
    });
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    this.context.onLogout();
    history.push('/login');
  };

  state = { error: null };

  createSubmit = ev => {
    ev.preventDefault();
    const { name, email, location, username, password, image } = ev.target;
    const currentUsername = this.context.currentUser.username;

    this.setState({ error: null });
    const usernameVal =
      currentUsername === username.value ? '' : username.value.toLowerCase();

    const passwordVal = !password.value ? '' : password.value;

    Auth.updateAccount(
      {
        id: this.context.currentUser.id,
        name: name.value,
        email: email.value,
        location: location.value,
        username: usernameVal.trim(),
        password: passwordVal.trim(),
        avatar:
          image.value ||
          'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'
      },
      this.context.currentUser.id
    )
      .then(this.handleRegistrationSuccess())
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className='Creation'>
        <header className='Creation-Header'></header>
        <form
          className='Creation-Form'
          onSubmit={this.createSubmit}
          onChange={this.handleChange}
        >
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              value={this.state.name}
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
              value={this.state.email}
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
              value={this.state.location}
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
              value={this.state.username}
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
              value={this.state.avatar}
              type='text'
              name='image'
              placeholder='Avatar url'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Avatar url</span>
            </span>
          </label>
          <div className='btn-row'>
            <button className='submitLogin'>Submit Changes</button>
            <Link to='/Login'>
              <button className='newAccount'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
