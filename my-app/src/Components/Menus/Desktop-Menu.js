import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Desktop-Menu.css";

export default class DesktopMenu extends React.Component {
  render() {
    return (
      <div className="desktopMenu">
        <Link to="Login">Login</Link>
        <Link to="Create-Account">Create Account</Link>
        <form className="Desktop-Menu-UserSearchForm">
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
        <div className="DarkMode">
          <button className="LightModeToggle" onClick={this.props.LightMode}>
            <i className={this.props.state.LightModeIcon}></i>
          </button>
        </div>
      </div>
    );
  }
}
