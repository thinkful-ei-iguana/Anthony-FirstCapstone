import React from 'react';
import './Styles/App.css';
import { Route } from 'react-router-dom';
import NavMenu from './Components/Nav-Menu/Nav-Menu';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import AccountCreation from './Components/Account-Creation/Account-Creation';
import AccountLogin from './Components/Account-Login/Account-Login';
import DetailedView from './Components/Detailed-View/Detailed-View';
import SearchResults from './Components/Search-Results/Search-Results';
import AuthHelper from './Helpers/Auth';
import Context, { contextState } from './Components/Context/Context';
import config from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextState,
      currentUser: {},
      isLoggedIn: false,
      isLight: true,
      hasToken: this.state.hasAuthToken()
    };
  }

  componentDidMount() {
    if (this.hasAuthToken()) {
      AuthHelper.getCurrentUser(this.state.getAuthToken()).then(data =>
        this.setState(prevState => ({
          currentUser: data,
          isLoggedIn: !prevState.isLoggedIn
        }))
      );
    }
  }

  onLogin = () => {
    this.setState({ currentUser: currentUser, isLoggedIn: true });
  };

  onLogout = () => {
    window.localStorage.removeItem(config.TOKEN_KEY);
    this.setState({ currentUser: {}, isLoggedIn: false });
  };

  toggleLightMode = () => {
    this.setState(prevState => ({
      isLight: !prevState.isLight
    }));
  };

  render() {
    console.log(this.state);
    return (
      <Context.Provider
        value={{
          currentUser: this.state.currentUser,
          hasToken: this.state.hasToken,
          isLoggedIn: this.state.isLoggedIn,
          saveAuthToken: this.saveAuthToken,
          getAuthToken: this.getAuthToken,
          clearAuthToken: this.clearAuthToken,
          hasAuthToken: this.hasAuthToken,
          makeBasicAuthToken: this.makeBasicAuthToken,
          lightMode: this.toggleLightMode,
          hasUser: this.hasUser
        }}
      >
        {' '}
        <div className='App'>
          <NavMenu />

          <Route
            exact
            path='/'
            render={routeProps => {
              return <Landing {...routeProps} />;
            }}
          />

          <Route
            exact
            path='/Home'
            render={routeProps => {
              return <Home {...routeProps} />;
            }}
          />
          <Route
            exact
            path='/Login'
            render={routeProps => {
              return <AccountLogin {...routeProps} />;
            }}
          />
          <Route
            exact
            path='/Create-Account'
            render={routeProps => {
              return <AccountCreation {...routeProps} />;
            }}
          />
          <Route
            exact
            path='/search/:searchterm'
            render={routeProps => {
              return <SearchResults {...routeProps} />;
            }}
          />
          <Route
            path='/item/:listingid'
            render={routeProps => {
              return <DetailedView {...routeProps} />;
            }}
          />
        </div>
      </Context.Provider>
    );
  }
}

export default App;
