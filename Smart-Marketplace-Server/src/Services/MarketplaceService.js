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
  }
};

module.exports = MarketplaceService;
