const express = require('express');
const router = require('express').Router();
const {registerSubmit, loginSubmit} = require('../controllers/authController');

router.post('/register', registerSubmit);

router.post('/login', loginSubmit);

module.exports = router;