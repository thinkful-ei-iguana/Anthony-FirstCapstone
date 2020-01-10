import config from '../config';

const AuthHelper = {
  // api call the handles account creation
  createAccount(newAccount) {
    return fetch(`${config.API_ENDPOINT}/accounts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newAccount)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // api call that handles delete account request
  deleteAccount(username) {
    return fetch(`${config.API_ENDPOINT}/accounts/${username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    });
  },
  // api call that handles login request
  login(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  // api call that handles get current user data request
  getCurrentUser(token) {
    return fetch(`${config.API_ENDPOINT}/accounts`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.dbUser;
      });
  },
  // api call that handles get public account data request
  getPublicAccountData(username) {
    return fetch(`${config.API_ENDPOINT}/accounts/public/${username}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.dbUser;
      });
  },
  // api call that handles account update request
  updateAccount(updatedData, id) {
    return fetch(`${config.API_ENDPOINT}/accounts/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.TOKEN_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }
};

export default AuthHelper;
