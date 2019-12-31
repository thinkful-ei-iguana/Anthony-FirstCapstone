import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Nav-Menu.css';
import SmartLogoNav from '../../Assets/smartLogoNav.png';
import MobileMenu from '../Menus/Mobile-Menu';
import DesktopMenu from '../Menus/Desktop-Menu';
import TokenHelper from '../../Helpers/Token';
import Context from '../Context/Context';

function isMobile() {
  if (window.innerWidth < 1200) {
    return true;
  }
  return false;
}

export default class NavMenu extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

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
