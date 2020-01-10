import React from 'react';
import { Link } from 'react-router-dom';
import './Mobile-Menu.css';
import Context from '../Context/Context';
import NavSearch from '../Search-Field/Nav-Search-Field';

export default class DesktopMenu extends React.Component {
  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  // handles nav menu search
  processSearch = e => {
    e.preventDefault();
    const { term } = e.target;
    const value = term.value.replace(/ +/g, '-');
    const { history } = this.props;
    const destination = `/Search/${value}`;
    history.push(destination);
  };

  render() {
    // toggles light mode icon
    const LightModeToggle = this.context.isLight
      ? 'far fa-moon fa-fw'
      : 'far fa-lightbulb fa-fw';
    return (
      <div
        className={`mobileMenu ${
          this.props.state.open ? 'is-open' : 'is-closed'
        }`}
      >
        <nav className={this.props.state.open}>
          <button className='Close-Menu' onClick={this.props.mobileToggle}>
            <i className='fas fa-times'></i>
          </button>
          <div id='Inner-Container'>
            <div id='Account-Options'>
              {this.context.isLoggedIn ? (
                <div className='Header__logged-in'>
                  <div className='dropdown'>
                    <button className='dropbtn'>
                      <img
                        className='Mobile-avatarNavMenu'
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
                  <Link className='mobile-Login' to='/login'>
                    Log in
                  </Link>
                  <Link className='mobile-Register' to='/create-account'>
                    Register
                  </Link>
                </div>
              )}
            </div>
            <NavSearch history={this.props.history} />
            <div id='DarkMode'>
              <button
                className='LightModeToggle'
                onClick={this.context.lightMode}
              >
                <i className={LightModeToggle}></i>
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
