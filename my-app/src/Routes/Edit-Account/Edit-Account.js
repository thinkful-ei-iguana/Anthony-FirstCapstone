import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../Helpers/Auth';
import './Edit-Account.css';
import Context from '../../Components/Context/Context';

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

  // handles the change in values of the form
  handleChange = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.name.value
    });
  };

  // on mount checks if the user has an auth token if not sends them to the login page, if the do it stores their information
  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push('/Login');
    } else {
      this.setState({
        name: this.context.currentUser.name,
        email: this.context.currentUser.email,
        location: this.context.currentUser.location,
        username: this.context.currentUser.username,
        avatar: this.context.currentUser.avatar
      });
    }
  }

  // if update is successful it logs out the user and sends them to the login page
  handleRegistrationSuccess = user => {
    const { history } = this.props;
    this.context.onLogout();
    history.push('/login');
  };

  state = { error: null };

  // takes the data from the form and uses a helper function to make a api patch request
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
      <div className='Edit-Account'>
        <header className='Edit-Account-Header'>
          <h1>Edit Your Account Information</h1>
        </header>
        <h4 className='errorHandlerEditAccount'>{this.state.error}</h4>
        <form
          className='Edit-Form'
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
          <label className='field a-field a-field_a2 passwordSection'>
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
          <span className='passwordHint'>
            Must include 1 Uppercase, 1 Lowercase, 1 Special Character
          </span>
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
            <Link to={`/user/${this.context.currentUser.username}`}>
              <button className='newAccount'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
