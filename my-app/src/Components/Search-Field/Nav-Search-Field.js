import React from 'react';
import './NavSearchField.css';
import { withRouter } from 'react-router-dom';

class NavSearch extends React.Component {
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
      <form
        className='Desktop-Menu-UserSearchForm'
        onSubmit={this.processSearch}
      >
        <input
          className='navSearchBar'
          name='term'
          placeholder='Search'
          required
        />
        <button type='submit'>
          <i className='fas fa-search'></i>
        </button>
      </form>
    );
  }
}

export default withRouter(NavSearch);
