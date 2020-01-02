import React from 'react';
import '../../Styles/Listing.css';
import { Link } from 'react-router-dom';

export default function Listing(props) {
  function truncate(text) {
    const words = text.split(' ');
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + ' ...';
    }
    return text;
  }

  return (
    <div className='Results-item'>
      <Link to={`/listing/${props.id}`} className='ThingListItem'>
        <div
          className='ThingListItem__image'
          style={{ backgroundImage: `url(${props.image})` }}
        />

        <div className='ThingListItem__details'>
          <div className='ThingListItem__text'>
            <h2 className='ThingListItem__heading'>{props.title}</h2>
            <p className='ThingListItem__description'>
              {truncate(props.description)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
