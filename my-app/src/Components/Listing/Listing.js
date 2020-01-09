import React from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';

export default function Listing(props) {
  function truncateDesc(text) {
    const words = text.split('');
    if (words.length > 35) {
      return words.slice(0, 35).join('') + ' ...';
    }
    return text;
  }

  function truncateTitle(text) {
    const words = text.split('');
    if (words.length > 25) {
      return words.slice(0, 20).join('') + ' ...';
    }
    return text;
  }

  return (
    <Link to={`/listing/${props.id}`} className='ThingListItem'>
      <div
        className='ThingListItem__image'
        style={{ backgroundImage: `url(${props.image})` }}
      />

      <div className='ThingListItem__details'>
        <div className='ThingListItem__text'>
          <h2 className='ThingListItem__heading'>
            {truncateTitle(props.title)}
          </h2>
          <p className='ThingListItem__description'>
            {truncateDesc(props.description)}
          </p>
        </div>
      </div>
    </Link>
  );
}
