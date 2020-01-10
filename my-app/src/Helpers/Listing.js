import config from '../config';

const ListingHelper = {
  // api call that handles create listing request
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
  // api call that handles getting a specific listing's data
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
  // api call that handles getting the owner's data of a listing
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
  // handles the search request for listings
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
  // handles the delete request for listings
  delete(id) {
    return fetch(`${config.API_ENDPOINT}/listings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.TOKEN_KEY}`
      }
    });
  },
  // api call to get all of a specific users listings
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
  // api call for update request for listings
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
};

export default ListingHelper;
