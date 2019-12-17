const MarketplaceService = {
  getAllListings(knex) {
    return knex("listings").select("*");
  },
  getListingById(knex, id) {
    return knex("listings")
      .select("*")
      .where("id", id)
      .first();
  },
  insertListing(knex, newListing) {
    return knex("listings")
      .insert(newListing)
      .returning("*")
      .then(rows => rows[0]);
  },
  deleteListing(knex, id) {
    return knex("listings")
      .where({ id })
      .delete();
  },
  updateListing(knex, id, updatedData) {
    return knex("listings")
      .where({ id })
      .update(updatedData);
  }
};

module.exports = MarketplaceService;
