import React from 'react';
import '../../Styles/SearchField.css';

export default class SearchField extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  processSearch = e => {
    e.preventDefault();
    const { term } = e.target;
    const value = term.value.replace(/ +/g, '-');
    const { history } = this.props;
    const destination = `/Search/${value}`;
    history.push(destination);
  };

  render() {
    return (
      <form className='SearchForm' onSubmit={this.processSearch}>
        <label className='field search-field a-field_a2'>
          <input
            className='field__input a-field__input'
            placeholder='Search'
            name='term'
            required
          />
          <span className='a-field__label-wrap'>
            <span className='a-field__label'>Search</span>
          </span>
        </label>
        <button className='searchSubmit' type='submit'>
          <i className='fas fa-search'></i>
        </button>
      </form>
    );
  }
}
