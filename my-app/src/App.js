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
import TokenHelper from './Helpers/Token';
import Context from './Components/Context/Context';
import config from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: '',
        username: '',
        location: '',
        email: '',
        date_created: ''
      },
      isLight: true,
      hasToken: this.hasAuthToken()
    };
  }

  componentDidMount() {
    if (this.hasAuthToken()) {
      AuthHelper.getCurrentUser(this.getAuthToken()).then(data =>
        this.setState({
          currentUser: {
            name: data.name,
            username: data.username,
            location: data.location,
            email: data.email,
            date_created: data.date_created
          }
        })
      );
    }
  }

  toggleLightMode = () => {
    this.setState(prevState => ({
      isLight: !prevState.isLight
    }));
  };

  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  }
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  }
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  }
  hasAuthToken() {
    return !!this.getAuthToken();
  }
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  }

  render() {
    return (
      <Context.Provider
        value={{
          currentUser: this.state.currentUser,
          hasToken: this.state.hasToken,
          saveAuthToken: this.saveAuthToken,
          getAuthToken: this.getAuthToken,
          clearAuthToken: this.clearAuthToken,
          hasAuthToken: this.hasAuthToken,
          makeBasicAuthToken: this.makeBasicAuthToken,
          lightMode: this.toggleLightMode
        }}
      >
        <div className='App'>
          <NavMenu />
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/Home'>
            <Home />
          </Route>
          <Route
            exact
            path='/Login'
            render={routeProps => {
              return <AccountLogin {...routeProps} />;
            }}
          />
          <Route exact path='/Create-Account'>
            <AccountCreation />
          </Route>
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
