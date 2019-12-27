import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Nav-Menu.css";
import SmartLogoNav from "../../Assets/smartLogoNav.png";
import MobileMenu from "../Menus/Mobile-Menu";
import DesktopMenu from "../Menus/Desktop-Menu";

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
      isLight: true
    };
  }

  toggleLightMode = () => {
    this.setState(prevState => ({ isLight: !prevState.isLight }));
    console.log(this.state.isLight);
  };

  toggleMenu = () => {
    this.setState(prevState => ({ open: !prevState.open }));
    console.log("ran");
  };

  render() {
    console.log("open status", this.state.open);
    return (
      <header className="Nav-Header">
        <Link to="/Home">
          <img
            className="Nav-Logo"
            src={SmartLogoNav}
            alt="Smart Marketplace Logo"
          />
        </Link>
        <button className="Open-Menu" onClick={this.toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        {isMobile() ? (
          <MobileMenu
            id="MobileMenu"
            state={this.state}
            mobileToggle={this.toggleMenu}
            LightMode={this.toggleLightMode}
          />
        ) : (
          <DesktopMenu state={this.state} LightMode={this.toggleLightMode} />
        )}
      </header>
    );
  }
}
