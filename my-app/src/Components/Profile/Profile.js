import React from 'react';
import '../../Styles/Profile.css';
import AuthHelper from '../../Helpers/Auth';
import ListingHelper from '../../Helpers/Listing';
import Listing from '../Listing/Listing';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      myListings: []
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  truncate = text => {
    const words = text.split(' ');
    if (words.length > 5) {
      return words.slice(0, 10).join(' ') + ' ...';
    }
    return text;
  };

  componentDidMount() {
    AuthHelper.getPublicAccountData(
      this.props.match.params.username
    ).then(data => this.setState({ profileData: data }));
    ListingHelper.getAllMyListings(
      this.props.match.params.username
    ).then(data => this.setState({ myListings: data }));
  }

  editAccount = () => {
    console.log('not setup yet');
  };

  deleteAccount = () => {
    AuthHelper.deleteAccount(this.context.currentUser.username)
      .then(this.context.onLogout)
      .then(this.props.history.push('/Home'));
  };

  accountOption = () => {
    if (
      this.context.currentUser.username === this.props.match.params.username
    ) {
      return (
        <div className='accountButtons'>
          <button onClick={this.editAccount}>Edit Account</button>
          <button onClick={this.deleteAccount}>Delete Account</button>
        </div>
      );
    }
  };

  renderListing = () => {
    if (this.state.myListings.length > 1) {
      this.state.myListings.map(listing => {
        return <Listing key={listing.id} {...listing} />;
      });
    } else {
      return (
        <h3 className='noListing'>
          {this.props.match.params.username} has no listings currently
        </h3>
      );
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className='Profile'>
        <h2 className='profile-name'>{this.state.profileData.name}</h2>
        <a className='profile-email' href='#'>
          {this.state.profileData.email}
        </a>
        <span className='profile-location'>
          {this.state.profileData.location}
        </span>
        <span className='profile-date_created'>
          {this.state.profileData.date_created}
        </span>
        <div className='profile-listings'>{this.renderListing()}</div>
        <div>{this.accountOption()}</div>
      </div>
    );
  }
}
