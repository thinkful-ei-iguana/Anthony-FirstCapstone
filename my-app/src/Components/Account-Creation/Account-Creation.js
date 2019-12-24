import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Account-Creation.css";

export default class Login extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  createSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;
  };

  render() {
    return (
      <div className="Login">
        <header className="Login-Header"></header>
        <form className="Login-Form" onSubmit={this.createSubmit}>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="name"
              placeholder="Name"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Name</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="email"
              placeholder="Email"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Email</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="location"
              placeholder="Location"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Location</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="user_name"
              placeholder="Username"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Username</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="password"
              type="password"
              placeholder="Password"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Password</span>
            </span>
          </label>
          <div className="btn-row">
            <button className="submitLogin">Create</button>
            <Link to="/Login">
              <button className="newAccount">Have an account?</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
