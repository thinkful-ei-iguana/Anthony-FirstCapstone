import React from 'react';
import './Home.css';
import RecentResults from '../Recent-Results/Recent-Results';
import SearchField from '../../Components/Search-Field/Search-Field';

export default class Home extends React.Component {
  render() {
    return (
      <div className='Home'>
        <section className='Home-Header'>
          <SearchField history={this.props.history} />
        </section>
        <section className='Home-RecentResults'>
          <RecentResults />
        </section>
      </div>
    );
  }
}
