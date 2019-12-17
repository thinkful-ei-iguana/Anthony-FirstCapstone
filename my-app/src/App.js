import React from "react";
import "./Styles/App.css";
import { Route } from "react-router-dom";
import NavMenu from "./Components/Nav-Menu/Nav-Menu";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import AccountCreation from "./Components/Account-Creation/Account-Creation";
import AccountLogin from "./Components/Account-Login/Account-Login";
import DetailedView from "./Components/Detailed-View/Detailed-View";
import SearchResults from "./Components/Search-Results/Search-Results";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavMenu />
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/Home">
          <Home />
        </Route>
        <Route exact path="/Login">
          <AccountLogin />
        </Route>
        <Route exact path="/Create-Account">
          <AccountCreation />
        </Route>
        <Route
          exact
          path="/search/:searchterm"
          render={routeProps => {
            return <SearchResults {...routeProps} />;
          }}
        />
        <Route
          path="/item/:listingid"
          render={routeProps => {
            return <DetailedView {...routeProps} />;
          }}
        />
      </div>
    );
  }
}

export default App;
