import React from 'react';
import './Detailed-View.css';
import ListingHelper from '../../Helpers/Listing';
import { Link } from 'react-router-dom';
import Context from '../../Components/Context/Context';

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      owner: {},
      isLoading: true
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  // on mount gets the listing id from the url param then uses a helper function to make a api call for the listing data then once it gets the res it uses the owner value to pull the owner data so it can render it
  componentDidMount() {
    const { listingid } = this.props.match.params;
    ListingHelper.listingById(listingid).then(
      listingData =>
        this.setState({
          listing: listingData
        }) +
        ListingHelper.getListingOwnerData(listingData.owner).then(ownerData => {
          this.setState({ owner: ownerData, isLoading: false });
        })
    );
  }

  // handles the delete buton functionality
  deleteListing = () => {
    ListingHelper.delete(this.props.match.params.listingid).then(
      this.props.history.push('/Home')
    );
  };
  // checks if the current user's id matchs the listing owner
  ownerOption = () => {
    if (this.context.currentUser.id === this.state.listing.owner) {
      return (
        <div className='ownerButtons'>
          <Link
            className='editListing'
            to={`/Edit-Listing/${this.state.listing.id}`}
          >
            Edit Listing
          </Link>
          <button className='deleteListing' onClick={this.deleteListing}>
            Delete Listing
          </button>
        </div>
      );
    }
  };

  // renders loading til fetch call returns
  Loading = () => {
    return this.state.isLoading ? (
      <h3 className='Loading'>Loading...</h3>
    ) : (
      this.ifVaildListing()
    );
  };

  // checks the url param id to see if its a valid listing if not renders a error message informing the user
  ifVaildListing = () => {
    if (this.state.listing.id > 0) {
      return (
        <div className='view'>
          <div className='section'>
            <h1 className='listing-title'>{this.state.listing.title}</h1>
            <div className='container'>
              <div
                className='image'
                style={{
                  backgroundImage: `url(${this.state.listing.image})`
                }}
              />
            </div>
          </div>
          <div className='section'>
            <h1 className='listing-header'>LISTING DETAILS</h1>
            <div className='container'>
              <h2 className='item-title'>{this.state.listing.title}</h2>
              <span className='view-counter'>
                <i class='far fa-eye'></i> {this.state.listing.page_views}
              </span>
              <span className='item-price'>
                {' '}
                {`${this.state.owner.username} is wanting ${this.state.listing.price} for this item`}
              </span>
              <span className='item-condition'>
                Item is {this.state.listing.condition}
              </span>
              <span className='item-date_created'>
                Posted On:{' '}
                {
                  new Date(this.state.listing.date_created)
                    .toLocaleString()
                    .split(',')[0]
                }
              </span>
              <p className='item-description'>
                {this.state.listing.description}
              </p>
              <div className='owner'>
                Posted By:{' '}
                <Link
                  to={`/user/${this.state.owner.username}`}
                  className='item-owner'
                >
                  {this.state.owner.username}
                </Link>
              </div>
            </div>
            {this.ownerOption()}
          </div>
        </div>
      );
    } else {
      return (
        <h3 className='noSuchListing'>
          Couldn't find a listing with that id. Please check your url path.
        </h3>
      );
    }
  };

  render() {
    return <div>{this.Loading()}</div>;
  }
}
