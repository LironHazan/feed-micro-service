'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./feeds');

router.get('/all', controller.fetchAllFeed);

router.get('/filter', controller.filterFeed);

module.exports = router;