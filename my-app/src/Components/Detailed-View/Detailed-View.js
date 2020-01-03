import React from 'react';
import '../../Styles/Detailed-View.css';
import ListingHelper from '../../Helpers/Listing';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      owner: {}
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { listingid } = this.props.match.params;
    console.log(listingid);
    ListingHelper.listingById(listingid).then(
      listingData =>
        this.setState({
          listing: listingData
        }) +
        ListingHelper.getListingOwnerData(listingData.owner).then(ownerData => {
          this.setState({ owner: ownerData });
        })
    );
  }

  deleteListing = () => {
    ListingHelper.delete(this.props.match.params.listingid).then(
      this.props.history.push('/Home')
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.id === this.state.listing.owner) {
      return <button onClick={this.deleteListing}>Delete Listing</button>;
    }
  };

  render() {
    return (
      <div className='view'>
        <div className='image-container'>
          <div
            className='image'
            style={{ backgroundImage: `url(${this.state.listing.image})` }}
          />
        </div>
        <h2 className='item-title'>{this.state.listing.title}</h2>
        <span className='item-condition'>
          Item is {this.state.listing.condition}
        </span>
        <span className='item-date_created'>
          Posted On: {this.state.listing.date_created}
        </span>
        <p className='item-description'>{this.state.listing.description}</p>
        <div className='owner'>
          <span>Posted By: </span>
          <Link
            to={`/user/${this.state.owner.username}`}
            className='item-owner'
          >
            {this.state.owner.username}
          </Link>
        </div>
        <div>{this.deleteOption()}</div>
      </div>
    );
  }
}
