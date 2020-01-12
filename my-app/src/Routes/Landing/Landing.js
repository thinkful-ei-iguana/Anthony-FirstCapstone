import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import PhoneSVG from '../../Components/SVGs/PhoneSVG';
import SmartLogo from '../../Assets/smartLogo.png';

export default class Landing extends React.Component {
  render() {
    return (
      <div className='Landing'>
        <header className='Landing-Header flex-container'>
          <div className='flex-item Branding'>
            <img
              className='Landing-Logo'
              src={SmartLogo}
              alt='Smart Marketplace Logo'
            />
            <h4 className='Landing-Slogan'>
              quality shopping with a modern twist
            </h4>
            <div className='HomeBtn'>
              <Link className='Home-Btn' to='/Home'>
                Continue to site
              </Link>
            </div>
          </div>
          <div className='flex-item SVG'>
            <PhoneSVG />
          </div>
        </header>
        <section className='Landing-Documentation'>
          <div className='FAQ'>
            <h2 className='FAQ-H2'>What is Smart Marketplace?</h2>
            <p className='FAQ-P'>
              Smart Marketplace is a clothing resell app where consumers can
              sell or buy clothing. Users have the ability to create profile
              that will display their profile information and their listings
              they currently have posted on the marketplace.
              <div className='demo-credentials'>
                <h5>Demo Credentials</h5>
                <div>
                  <span className='demo-label'>Username:</span>
                  <span className='demo-content'> Demo</span>
                </div>
                <div>
                  <span className='demo-label'>Password:</span>
                  <span className='demo-content'> Demo123!</span>
                </div>
              </div>
            </p>
          </div>
          <hr className='Landing-Divider' />
          <div className='FAQ'>
            <h2 className='FAQ-H2'>Detailed Information</h2>
            <p className='FAQ-P'>
              The front-end of Smart-Marketplace was built using ReactJS and
              vanilla CSS. Some of React's key features I used were React
              Router, Context and I used State Mangement throughout the
              components. For the front-end unit & integration testing I used
              Mocha & Chai. Now on to the back-end of the app. Starting with the
              Node API I built using ExpressJS's router. Then I used KnexJS to
              make search queries for my PostgreSQL database. All of the
              endpoints were tested using Mocha & Chai as well.
              <div className='project-details'>
                <h5>Project Details</h5>
                <div>
                  <span className='label'>Front-End Tech Used:</span>{' '}
                  <span className='content'>ReactJS, CSS, Mocha & Chai</span>
                </div>
                <div>
                  <span className='label'>Back-End Tech Used: </span>{' '}
                  <span className='content'>
                    NodeJS, Express, KnexJS, PostgreSQL, Mocha & Chai
                  </span>
                </div>
                <div>
                  <span className='label'>Completed In:</span>
                  <span className='content'> 51 hours</span>
                </div>
              </div>
            </p>
          </div>
        </section>
        <section className='Landing-Buttons'>
          <h3 className='Connect-H3'>Connect With Me</h3>
          <hr className='Connect-Divider' />
          <div className='buttons'>
            <a
              href='https://github.com/thinkful-ei-iguana/Anthony-FirstCapstone'
              target='blank_'
            >
              <i className='fab fa-github'></i>
            </a>
            <a href='https://www.linkedin.com/in/anthonytb/' target='blank_'>
              <i className='fab fa-linkedin-in'></i>
            </a>
            <a href='https://anthonyb.dev/' target='blank_'>
              <i className='fas fa-desktop'></i>
            </a>
          </div>
        </section>
      </div>
    );
  }
}
