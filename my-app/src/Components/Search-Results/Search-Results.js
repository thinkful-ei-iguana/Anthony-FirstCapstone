import React from 'react';
import './Search-Results.css';
import ListingHelper from '../../Helpers/Listing';
import SearchField from '../Search-Field/Search-Field';
import Listing from '../Listing/Listing';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredListings: [],
      isLoading: true
    };
  }

  static defaultProps = {
    match: { params: {} }
  };

  // on mount grabs url param and replaces the hyphen with a space then sends the value to helpers for the api call
  componentDidMount() {
    const { term } = this.props.match.params;
    const value = term.replace('-', ' ');
    ListingHelper.search(value).then(res => {
      this.setState({ filteredListings: res, isLoading: false });
    });
  }

  // renders loading til fetch call returns
  Loading = () => {
    return this.state.isLoading ? (
      <h3 className='Loading'>Loading...</h3>
    ) : (
      this.ifResults()
    );
  };

  // checks if theres results from the users search if no results it will display a message
  ifResults = () => {
    if (this.state.filteredListings.length > 0) {
      return this.state.filteredListings.map(listing => (
        <div className='Search-Results-item'>
          <Listing key={listing.id} {...listing} />
        </div>
      ));
    } else {
      return (
        <h3 className='noResults'>
          Sorry couldn't find a active listing with that name
        </h3>
      );
    }
  };

  render() {
    return (
      <div className='Search-Results'>
        <header className='Search-Header'>
          <SearchField />
        </header>
        <section className='Search-ResultsList'>{this.Loading()}</section>
      </div>
    );
  }
}
