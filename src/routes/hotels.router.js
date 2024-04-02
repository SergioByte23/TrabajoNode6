const { getAll, create, getOne, remove, update } = require('../controllers/hotels.controllers.js');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.js');

const hotelsRouter = express.Router();

hotelsRouter.route('/hotels')
    .get(getAll)
    .post(verifyJWT,create);

hotelsRouter.route('/hotels/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = hotelsRouter;