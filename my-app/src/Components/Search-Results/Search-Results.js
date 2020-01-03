import React from 'react';
import '../../Styles/Search-Results.css';
import ListingHelper from '../../Helpers/Listing';
import SearchField from '../Search-Field/Search-Field';
import Listing from '../Listing/Listing';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredListings: []
    };
  }

  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { term } = this.props.match.params;
    ListingHelper.search(term).then(res => {
      this.setState({ filteredListings: res });
    });
  }

  render() {
    console.log(this.state.filteredListings);
    return (
      <div className='Search-Results'>
        <header className='Search-Header'>
          <SearchField />
        </header>
        <section className='Search-ResultsList'>
          {this.state.filteredListings.map(listing => (
            <Listing key={listing.id} {...listing} />
          ))}
        </section>
      </div>
    );
  }
}
