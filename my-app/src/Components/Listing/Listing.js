import React from 'react';
import './Listing.css';
import { Link } from 'react-router-dom';

export default function Listing(props) {
  // Shortens description if to long
  function truncateDesc(text) {
    const words = text.split('');
    if (words.length > 25) {
      return words.slice(0, 25).join('') + ' ...';
    }
    return text;
  }

  // Shortens title if to long
  function truncateTitle(text) {
    const words = text.split('');
    if (words.length > 10) {
      return words.slice(0, 10).join('') + ' ...';
    }
    return text;
  }

  return (
    <Link to={`/listing/${props.id}`} className='ThingListItem'>
      <div
        className='ThingListItem__image'
        style={{
          backgroundImage: `url(${props.image})`
        }}
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
