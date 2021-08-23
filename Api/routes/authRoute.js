const express = require('express');
const router = require('express').Router();
const {registerSubmit, loginSubmit, getLoggedInUser} = require('../controllers/authController');

router.post('/register', registerSubmit);

router.post('/login', loginSubmit);

router.get('/loggedIn', getLoggedInUser);

module.exports = router;