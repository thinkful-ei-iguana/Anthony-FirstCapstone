const express = require('express');
const listingRouter = express.Router();
const logger = require('../logger');
const bodyParser = express.json();
const MarketplaceService = require('../Services/MarketplaceService');
const AccountService = require('../Services/AccountService');
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

listingRouter.route('/user/:id').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  MarketplaceService.getAllByUser(knexInstance, id)
    .then(listing => {
      res.json(
        listing.map(listing => {
          return {
            id: listing.id,
            title: listing.title,
            condition: xss(listing.condition),
            price: listing.price,
            date_created: listing.date_created,
            owner: listing.owner,
            image: listing.image,
            description: xss(listing.description)
          };
        })
      );
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
        const listingid = listing.id;
        const views = listing.page_views;
        let newVal = views + 1;

        MarketplaceService.updatePageViews(
          knexInstance,
          listingid,
          newVal
        ).then(data => {
          res.json(data[0]);
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
          logger.error(`Listing with id ${id} not found`);
          return res.status(404).send('Listing not found');
        }
        logger.info(`Listing with id ${id} has been deleted`);
        res.status(204).end();
      })
      .catch(next);
  });

listingRouter.route('/owner/:ownerid').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  const { ownerid } = req.params;
  MarketplaceService.getListingOwnerData(knexInstance, ownerid).then(
    ownerData => {
      delete ownerData.password;
      res.json(ownerData);
    }
  );
});

listingRouter.route('/').post(bodyParser, (req, res, next) => {
  const {
    title,
    category,
    price,
    owner,
    image,
    location,
    condition,
    date_created,
    description,
    page_views
  } = req.body;

  if (!title) {
    logger.error('Title is required');
    return res.status(400).send('Title required');
  }
  if (!category) {
    logger.error('Category is required');
    return res.status(400).send('Category required');
  }
  if (!price) {
    logger.error('Price is required');
    return res.status(400).send('Price required');
  }
  if (!owner) {
    logger.error('Owner is required');
    return res.status(400).send('Owner required');
  }
  if (!location) {
    logger.error('Location is required');
    return res.status(400).send('Location required');
  }
  if (!image) {
    logger.error('Image is required');
    return res.status(400).send('Image required');
  }
  if (!condition) {
    logger.error('Condition is required');
    return res.status(400).send('Condition required');
  }
  if (!date_created) {
    logger.error('Date created is required');
    return res.status(400).send('Date created required');
  }
  if (!description) {
    logger.error('Description is required');
    return res.status(400).send('Description required');
  }

  const listing = {
    title,
    category,
    owner,
    price,
    date_created,
    condition,
    location,
    image,
    description,
    page_views
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

listingRouter.route('/search/:term').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  const { term } = req.params;
  MarketplaceService.searchListings(knexInstance, term).then(data => {
    res.json(data);
  });
});

listingRouter.patch('/edit/:id', bodyParser, (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  const { title, category, price, condition, description, image } = req.body;
  const updatedData = {
    title,
    category,
    price,
    condition,
    description,
    image
  };

  const numberOfValues = Object.values(updatedData).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message:
          'Request body must contain either title, category, price, description or image'
      }
    });
  }

  MarketplaceService.updateListing(knexInstance, id, updatedData)
    .then(update => {
      console.log(update);
      res.status(204).end();
    })
    .catch(next);
});

module.exports = listingRouter;
