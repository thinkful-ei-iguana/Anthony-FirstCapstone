import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Desktop-Menu.css';
import Context from '../Context/Context';

export default class DesktopMenu extends React.Component {
  static contextType = Context;

  render() {
    const LightModeToggle = this.context.isLight
      ? 'far fa-moon fa-fw'
      : 'far fa-lightbulb fa-fw';
    return (
      <div className='desktopMenu'>
        {this.context.hasToken
          ? this.props.renderLogoutLink()
          : this.props.renderLoginLink()}
        <form className='Desktop-Menu-UserSearchForm'>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              placeholder='Apple IPhone 11'
              required
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Search</span>
            </span>
          </label>
          <button type='submit'>search</button>
        </form>
        <div className='DarkMode'>
          <button className='LightModeToggle' onClick={this.context.LightMode}>
            <i className={LightModeToggle}></i>
          </button>
        </div>
      </div>
    );
  }
}
