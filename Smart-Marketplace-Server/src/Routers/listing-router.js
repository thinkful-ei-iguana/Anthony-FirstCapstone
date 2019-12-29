const express = require('express');
const listingRouter = express.Router();
const logger = require('../logger');
const bodyParser = express.json();
const MarketplaceService = require('../Services/MarketplaceService');
const xss = require('xss');
const path = require('path');

listingRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  MarketplaceService.getAllListings(knexInstance)
    .then(listings => {
      res.json(listings);
    })
    .catch(next);
});

listingRouter
  .route('/:id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    MarketplaceService.getListingById(knexInstance, id)
      .then(listing => {
        if (!listing) {
          logger.error(`listing with id ${id} not found`);
          return res.status(404).send('Listing not found');
        }
        res.json({
          id: listing.id,
          title: listing.title,
          url: xss(listing.url),
          rating: listing.rating,
          description: xss(listing.description)
        });
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    MarketplaceService.deleteListing(knexInstance, id)
      .then(listing => {
        if (listing === -1) {
          logger.error(`Card with id ${id} not found`);
          return res.status(404).send('Listing not found');
        }
        logger.info(`Listing with id ${id} has been deleted`);
        res.status(204).end();
      })
      .catch(next);
  });

listingRouter.route('/').post(bodyParser, (req, res, next) => {
  const { title, url, rating, description } = req.body;

  if (!title) {
    logger.error('Title is required');
    return res.status(400).send('Title required');
  }
  if (!url) {
    logger.error('Url is required');
    return res.status(400).send('Url required');
  }
  if (!rating) {
    logger.error('Rating is required');
    return res.status(400).send('Rating required');
  }

  const listing = {
    title,
    url,
    rating,
    description
  };

  const knexInstance = req.app.get('db');

  MarketplaceService.insertListing(knexInstance, listing)
    .then(listing => {
      const { id } = listing;
      logger.info(`Listing with id of ${id} was created`);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${listing.id}`))
        .json(listing);
    })
    .catch(next);
});

listingRouter.patch('/edit/:id', bodyParser, (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  const { title, url, rating, description } = req.body;
  const updatedData = {
    title,
    url,
    rating,
    description
  };

  const numberOfValues = Object.values(updatedData).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message:
          "Request body must contain either 'title', 'url', 'description or 'rating'"
      }
    });
  }

  MarketplaceService.updateListing(knexInstance, id, updatedData)
    .then(update => {
      res.status(204).end();
    })
    .catch(next);
});

module.exports = listingRouter;
