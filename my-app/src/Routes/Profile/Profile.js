import React from 'react';
import './Profile.css';
import AuthHelper from '../../Helpers/Auth';
import ListingHelper from '../../Helpers/Listing';
import Listing from '../../Components/Listing/Listing';
import { Link } from 'react-router-dom';
import Context from '../../Components/Context/Context';

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      firstName: '',
      myListings: [],
      isLoading: true
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  // shortens the description of the listings
  truncate = text => {
    const words = text.split(' ');
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + ' ...';
    }
    return text;
  };

  // gets the profile username from the url param then uses a helper function to get the profiles data once that response returns then it will use the profile id to make another request to grab thei active listings
  componentDidMount() {
    AuthHelper.getPublicAccountData(this.props.match.params.username).then(
      data =>
        this.setState({
          profileData: data,
          firstName: data.name.split(' ')[0]
        }) +
        ListingHelper.getAllMyListings(data.id).then(listingData => {
          this.setState({
            myListings: listingData,
            isLoading: false
          });
        })
    );
  }

  // handles the delete account button
  deleteAccount = () => {
    AuthHelper.deleteAccount(this.context.currentUser.username)
      .then(this.context.onLogout)
      .then(this.props.history.push('/Home'));
  };

  // checks if current user id matches the profile owner id if so it renders the edit/delete buttons, if not it doesnt render the buttons
  accountOption = () => {
    if (
      this.context.currentUser.username === this.props.match.params.username
    ) {
      return (
        <div className='accountButtons'>
          <Link className='editAccount' to='/Edit-Account'>
            Edit Account
          </Link>
          <button className='deleteAccount' onClick={this.deleteAccount}>
            Delete Account
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
      this.ifValidProfile()
    );
  };

  // checks if the username from url param has an id if so it renders the profile, if not it renders a error message
  ifValidProfile = () => {
    if (this.state.profileData.id > 0) {
      return (
        <div className='Profile'>
          <div className='section'>
            <h1 className='profile-name'>
              MEET {this.state.firstName.toUpperCase()}
            </h1>
            <div className='container profile'>
              <div
                className='avatar'
                style={{
                  backgroundImage: `url(${this.state.profileData.avatar})`
                }}
              />
              <a
                className='profile-email'
                href={`mailto://${this.state.profileData.email}`}
              >
                {this.state.profileData.email}
              </a>
              <span className='profile-location'>
                Located in: {this.state.profileData.location}
              </span>
              <span className='profile-date_created'>
                Member Since:{' '}
                {
                  new Date(this.state.profileData.date_created)
                    .toLocaleString()
                    .split(',')[0]
                }
              </span>
            </div>
            {this.accountOption()}
          </div>
          <div className='section'>
            <h1>FOR SALE</h1>
            <div className='container listing'>
              {this.state.myListings.length > 0
                ? this.renderListing()
                : this.renderNoListing()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <h3 className='noSuchUser'>
          Sorry couldn't find a user with that username. Please check your url
          path.
        </h3>
      );
    }
  };

  // renders the profile owners listings
  renderListing = () => {
    return this.state.myListings.map(listing => {
      return (
        <div className='item'>
          <div className='Profile-Results-item'>
            <Listing key={listing.id} {...listing} />
          </div>
        </div>
      );
    });
  };

  // if the profile owner has no listings it will render this error message
  renderNoListing = () => {
    return (
      <h3 className='noListing'>
        {this.state.firstName} has no listings currently
      </h3>
    );
  };

  render() {
    return <div>{this.Loading()}</div>;
  }
}
