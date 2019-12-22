import React from "react";
import { Link } from "react-router-dom";

export default class DesktopMenu extends React.Component {
  render() {
    return (
      <div className="mobileMenu">
        <button id="Open-Menu" onClick={this.props.mobileToggle}>
          <i className="fas fa-bars"></i>
        </button>
        <nav className={this.props.state.open}>
          <button id="Close-Menu" onClick={this.props.mobileToggle}>
            <i className="fas fa-times"></i>
          </button>
          <div id="Inner-Container">
            <div id="Account-Options">
              <button>Login</button>
              <button>Create Account</button>
            </div>
            <form id="Mobile-Menu-UserSearchForm">
              <label className="field a-field a-field_a2">
                <input
                  className="field__input a-field__input"
                  placeholder="Apple IPhone 11"
                  required
                />
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Search</span>
                </span>
              </label>
              <button type="submit">search</button>
            </form>
            <div id="DarkMode">
              <button
                className="LightModeToggle"
                onClick={this.props.LightMode}
              >
                <i className={this.props.state.LightModeIcon}></i>
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
