const xss = require('xss');

const MarketplaceService = {
  getAllListings(knex) {
    return knex('listings').select('*');
  },
  getAllByUser(knex, id) {
    return knex('listings')
      .select('*')
      .where('owner', id);
  },
  getListingById(knex, id) {
    return knex('listings')
      .select('*')
      .where('id', id)
      .first();
  },
  getListingOwnerData(knex, ownerid) {
    return knex('users')
      .where('id', ownerid)
      .first();
  },
  insertListing(knex, newListing) {
    return knex('listings')
      .insert(newListing)
      .returning('*')
      .then(rows => rows[0]);
  },
  deleteListing(knex, id) {
    return knex('listings')
      .where({ id })
      .delete();
  },
  searchListings(knex, term) {
    return knex('listings')
      .select('*')
      .where('title', term);
  },
  updateListing(knex, id, updatedData) {
    return knex('listings')
      .where({ id })
      .update(updatedData);
  },
  updatePageViews(knex, listingid, newVal) {
    return knex('listings')
      .where('id', listingid)
      .update('page_views', newVal)
      .returning('*');
  },
  serializeListing(listing) {
    return {
      id: listing.id,
      title: xss(listing.title),
      category: xss(listing.category),
      owner: xss(listing.owner),
      price: xss(listing.price),
      date_created: new Date(listing.date_created),
      condition: xss(listing.condition),
      location: xss(listing.location),
      image: xss(listing.image),
      description: xss(listing.description),
      page_views: xss(listing.page_views)
    };
  }
};

module.exports = MarketplaceService;
