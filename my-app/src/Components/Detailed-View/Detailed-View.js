import React from 'react';
import '../../Styles/Detailed-View.css';
import ListingHelper from '../../Helpers/Listing';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {}
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { listingid } = this.props.match.params;
    console.log(listingid);
    ListingHelper.listingById(listingid).then(listingData =>
      this.setState({
        listing: {
          title: listingData.title,
          condition: listingData.condition,
          description: listingData.description,
          price: listingData.price,
          date_created: listingData.date_created,
          image: listingData.image,
          owner: listingData.owner
        }
      })
    );
  }

  deleteListing = () => {
    ListingHelper.delete(this.props.match.params.listingid).then(
      this.props.history.push('/Home')
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.username === this.state.listing.owner) {
      return <button onClick={this.deleteListing}>Delete Listing</button>;
    }
  };

  render() {
    return (
      <div className='view'>
        <div
          className='ThingListItem__image'
          style={{ backgroundImage: `url(${this.state.listing.image})` }}
        />
        <h2 className='item-title'>{this.state.listing.title}</h2>
        <span className='item-condition'>{this.state.listing.condition}</span>
        <span className='item-date_created'>
          {this.state.listing.date_created}
        </span>
        <p className='item-description'>{this.state.listing.description}</p>
        <Link to={`/user/${this.state.listing.owner}`} className='item-owner'>
          {this.state.listing.owner}
        </Link>
        <div>{this.deleteOption()}</div>
      </div>
    );
  }
}
