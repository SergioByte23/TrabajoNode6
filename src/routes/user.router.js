const { getAll, create, getOne, remove, update, login, getLoggedUser } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const UserRouter = express.Router();

UserRouter.route('/users')
    .get(verifyJWT, getAll)
    .post(create);

UserRouter.route('/users/login')
    .post(login);

UserRouter.route('/users/me')
    .get(getLoggedUser)

UserRouter.route('/users/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = UserRouter;