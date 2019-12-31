import React from 'react';
import config from './config';

export const contextState = {
  saveAuthToken = (token) => {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken = () => {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  hasAuthToken = () => {
    return !!this.getAuthToken();
  },
  makeBasicAuthToken = (userName, password) => {
    return window.btoa(`${userName}:${password}`);
  }
};

const Context = React.createContext(contextState);

export default Context;
