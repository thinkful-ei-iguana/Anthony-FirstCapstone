import config from '../config';

const ListingHelper = {
  createListing(newListing) {
    return fetch(`${config.API_ENDPOINT}/listings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newListing)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  listingById(id) {
    return fetch(`${config.API_ENDPOINT}/listings/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getListingOwnerData(ownerid) {
    return fetch(`${config.API_ENDPOINT}/listings/owner/${ownerid}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  search(term) {
    return fetch(`${config.API_ENDPOINT}/listings/search/${term}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  delete(id) {
    return fetch(`${config.API_ENDPOINT}/listings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.TOKEN_KEY}`
      }
    });
  },
  getAllMyListings(id) {
    return fetch(`${config.API_ENDPOINT}/listings/user/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateListing(updatedData, id) {
    return fetch(`${config.API_ENDPOINT}/listings/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.TOKEN_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }

  // get listing by owner
  // post listing
  // patch listing
  // delete listing
};

export default ListingHelper;
