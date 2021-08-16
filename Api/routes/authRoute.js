const express = require('express');
const router = require('express').Router();
const {registerSubmit} = require('../controllers/registerController');

router.post('/register', registerSubmit);

module.exports = router;