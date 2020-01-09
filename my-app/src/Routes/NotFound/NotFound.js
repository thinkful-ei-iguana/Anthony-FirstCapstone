import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className='notFound'>
      <h3>I think were lost lets go back Home</h3>
      <Link to='/'>
        <button className='returnHome'>Return Home</button>
      </Link>
    </div>
  );
}
