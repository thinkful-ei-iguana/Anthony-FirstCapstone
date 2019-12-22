import React from "react";
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
      LightModeIcon: "far fa-lightbulb"
    };
  }

  toggleLightMode = () => {
    if (this.state.LightModeIcon === "far fa-lightbulb") {
      this.setState({ LightModeIcon: "far fa-moon" });
    } else {
      this.setState({ LightModeIcon: "far fa-lightbulb" });
    }
    console.log(this.state.LightModeIcon);
  };

  toggleMenu = () => {
    this.setState(prevState => ({ open: !prevState.open }));
    console.log("ran");
  };

  render() {
    console.log("open status", this.state.open);
    return (
      <header className="Nav-Header">
        <img id="Nav-Logo" src={SmartLogoNav} alt="Smart Marketplace Logo" />
        {isMobile() ? (
          <MobileMenu
            className={this.state.open ? "is-open" : "is-closed"}
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
