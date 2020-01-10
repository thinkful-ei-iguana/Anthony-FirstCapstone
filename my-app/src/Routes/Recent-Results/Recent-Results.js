import React from 'react';
import config from '../../config';
import Listing from '../../Components/Listing/Listing';
import './Recent-Results.css';

export default class RecentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  // on mount it makes a api call to get all the active listings
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/listings`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(listingsRes => this.setState({ listings: listingsRes }));
  }

  render() {
    return (
      <div className='RecentResults'>
        <section className='flex-container'>
          {this.state.listings.map(listing => (
            <div className='Results-item'>
              <Listing key={listing.id} {...listing} />
            </div>
          ))}
        </section>
      </div>
    );
  }
}
