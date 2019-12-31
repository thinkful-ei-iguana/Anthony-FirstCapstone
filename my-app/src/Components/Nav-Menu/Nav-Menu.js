import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Nav-Menu.css';
import SmartLogoNav from '../../Assets/smartLogoNav.png';
import MobileMenu from '../Menus/Mobile-Menu';
import DesktopMenu from '../Menus/Desktop-Menu';
import TokenHelper from '../../Helpers/Token';

function isMobile() {
  if (window.innerWidth < 1200) {
    return true;
  }
  return false;
}

export default class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLight: true,
      hasToken: TokenHelper.hasAuthToken()
    };
  }

  handleHasToken = () => {
    console.log('handle worked');
    this.setState({
      hasToken: TokenHelper.hasAuthToken()
    });
    console.log(this.state.hasToken);
  };

  toggleLightMode = () => {
    this.setState(prevState => ({
      isLight: !prevState.isLight
    }));
  };

  toggleMenu = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  renderLoginLink() {
    return (
      <div className='Header__logged-out'>
        <Link to='/login'>Log in</Link>
        <Link to='/create-account'>Register</Link>
      </div>
    );
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link to='/user/:username'>Username</Link>
        <Link onClick={TokenHelper.clearAuthToken} to='/Home'>
          Logout
        </Link>
      </div>
    );
  }

  render() {
    return (
      <header className='Nav-Header'>
        <Link to='/Home'>
          <img
            className='Nav-Logo'
            src={SmartLogoNav}
            alt='Smart Marketplace Logo'
          />
        </Link>
        <button className='Open-Menu' onClick={this.toggleMenu}>
          <i className='fas fa-bars'></i>
        </button>
        {isMobile() ? (
          <MobileMenu
            id='MobileMenu'
            state={this.state}
            mobileToggle={this.toggleMenu}
            LightMode={this.toggleLightMode}
            renderLoginLink={this.renderLoginLink}
            renderLogoutLink={this.renderLogoutLink}
          />
        ) : (
          <DesktopMenu
            state={this.state}
            LightMode={this.toggleLightMode}
            renderLoginLink={this.renderLoginLink}
            renderLogoutLink={this.renderLogoutLink}
          />
        )}
      </header>
    );
  }
}
