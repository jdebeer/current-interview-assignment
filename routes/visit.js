const { Router } = require('express');
const controllers = require('../controllers');
const route = Router();

route.get('/', controllers.visit.fetch);
route.post('/', controllers.visit.create);

module.exports = route;