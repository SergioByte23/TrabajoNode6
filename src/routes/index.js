const express = require('express');
const UserRouter = require('./user.router');
const cityRouter = require('./city.router');
const hotelsRouter=require('./hotels.router');
const imageRouter = require('./image.router');
const bookingRouter = require('./booking.router');
const reviewRouter = require('./review.router');
const router = express.Router();

// colocar las rutas aquí
router.use(UserRouter);
router.use(cityRouter);
router.use(hotelsRouter);
router.use(imageRouter);
router.use(bookingRouter);
router.use(reviewRouter);

module.exports = router;