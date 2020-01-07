import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Desktop-Menu.css';
import Context from '../Context/Context';
import NavSearch from '../Search-Field/Nav-Search-Field';

export default class DesktopMenu extends React.Component {
  static contextType = Context;

  render() {
    const LightModeToggle = this.context.isLight
      ? 'far fa-lightbulb fa-fw'
      : 'far fa-moon fa-fw';
    return (
      <div className='desktopMenu'>
        {this.context.isLoggedIn ? (
          <div className='Header__logged-in'>
            <div className='dropdown'>
              <button className='dropbtn'>
                <img
                  className='avatarNavMenu'
                  src={this.context.currentUser.avatar}
                  alt='avatar'
                />
              </button>
              <div className='dropdown-content'>
                <Link to={`/user/${this.context.currentUser.username}`}>
                  My Account
                </Link>
                <Link to='/Create-Listing'>Create Listing</Link>
                <Link onClick={this.context.onLogout} to='/Home'>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='Header__logged-out'>
            <Link className='loginBtn' to='/login'>
              Log in
            </Link>
            <Link className='registerBtn' to='/create-account'>
              Register
            </Link>
          </div>
        )}
        <NavSearch history={this.props.history} />
        <div className='DarkMode'>
          <button className='LightModeToggle' onClick={this.context.lightMode}>
            <i className={LightModeToggle}></i>
          </button>
        </div>
      </div>
    );
  }
}
