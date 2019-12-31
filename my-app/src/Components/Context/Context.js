import React from 'react';

const Context = React.createContext({
  currentUser: '',
  hasToken: '',
  lightMode: () => {},
  saveAuthToken: () => {},
  getAuthToken: () => {},
  clearAuthToken: () => {},
  hasAuthToken: () => {},
  makeBasicAuthToken: () => {}
});

export default Context;
