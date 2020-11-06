const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');

const { PORT } = require('../config');
const {bookmarks} = require('../store');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;

    if (!title) {
      logger.error('Title required');
      return res
        .status(400)
        .send('Invalid Title')
    }
    if (!url) {
      logger.error('URL required');
      return res
        .status(400)
        .send('Invalid URL')
    }
    if (!description) {
      logger.error('description required');
      return res
        .status(400)
        .send('Invalid description')
    }
    if (!rating) {
      logger.error('rating required');
      return res
        .status(400)
        .send('Invalid rating')
    }

    const id = uuid();

    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    }
    bookmarks.push(bookmark);

    logger.info(`Card with id ${id} created`);

    res
      .status(201)
      .location(`${PORT}/bookmarks/${id}`)
      .json(bookmark)
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(bookmark => bookmark.id === id);

    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark not found');
    }
    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarksIndex = bookmarks.findIndex(book => book.id === id);

    if (bookmarksIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark not found');
    }

    bookmarks.splice(bookmarksIndex, 1);

    logger.info(`Bookmark with id ${id} deleted`);
    res
      .status(204)
      .end();
  })

module.exports = bookmarksRouter;
