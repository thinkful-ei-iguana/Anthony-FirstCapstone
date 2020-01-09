import React from 'react';
import { Link } from 'react-router-dom';
import Listing from '../../Helpers/Listing';
import './Edit-Listing.css';
import Context from '../../Components/Context/Context';
import ListingHelper from '../../Helpers/Listing';

export default class CreateListing extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  ownerCheck = () => {
    if (this.context.currentUser.id !== this.state.owner) {
      return this.nonOwner();
    } else {
      return this.owner();
    }
  };

  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push('/Login');
    }
    ListingHelper.listingById(this.props.match.params.listingid).then(data => {
      this.setState({
        title: data.title,
        id: data.id,
        category: data.category,
        owner: data.owner,
        price: data.price,
        condition: data.condition,
        location: data.location,
        description: data.description,
        image: data.image,
        date_created: data.date_created,
        page_views: data.page_views
      });
    });
  }

  handleEditSuccess = () => {
    const { history } = this.props;
    history.push('/Home');
  };

  handleChange = ev => {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: ev.target.name.value
    });
  };

  editSubmit = ev => {
    ev.preventDefault();
    const { title, price, condition, description, image, category } = ev.target;

    this.setState({ error: null });
    Listing.updateListing(
      {
        title: title.value,
        category: category.value,
        owner: this.context.currentUser.id,
        price: price.value,
        condition: condition.value,
        location: this.context.currentUser.location,
        description: description.value,
        image: image.value
      },
      this.state.id
    )
      .then(listing => {
        title.value = '';
        price.value = '';
        description.value = '';
        image.value = '';
        this.handleEditSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  nonOwner = () => {
    return <h2>Sorry you're not the owner of this listing</h2>;
  };

  owner = () => {
    return (
      <div className='Edit-Listing'>
        <header className='Edit-Listing-Header'>
          <h1>Edit Listing</h1>
        </header>
        <h4 className='errorHandlerEditListing'>{this.state.error}</h4>
        <form
          className='Creation-Form'
          onSubmit={this.editSubmit}
          onChange={this.handleChange}
        >
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              value={this.state.title}
              name='title'
              placeholder='Title'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Title</span>
            </span>
          </label>
          <label className='categoryLabel'>Item Category</label>
          <div className='select'>
            <select name='category' selected={this.state.category}>
              <option disabled>Choose an option</option>
              <option value='1'>Shirts</option>
              <option value='2'>Pants</option>
              <option value='3'>Jackets</option>
              <option value='4'>Footwear</option>
              <option value='5'>Accessories</option>
            </select>
          </div>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              value={this.state.price}
              name='price'
              placeholder='Price'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Price</span>
            </span>
          </label>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              value={this.state.condition}
              type='text'
              name='condition'
              placeholder='Condition'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Condition</span>
            </span>
          </label>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              value={this.state.description}
              type='textfield'
              name='description'
              placeholder='Description'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Description</span>
            </span>
          </label>
          <label className='field a-field a-field_a2'>
            <input
              className='field__input a-field__input'
              required
              value={this.state.image}
              type='text'
              name='image'
              placeholder='Image url'
            />
            <span className='a-field__label-wrap'>
              <span className='a-field__label'>Image url</span>
            </span>
          </label>
          <div className='btn-row'>
            <button className='submitLogin'>Submit</button>
            <Link to='/Home'>
              <button className='newAccount'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div className='Edit'>{this.ownerCheck()}</div>;
  }
}
