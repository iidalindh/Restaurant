const express = require('express');
const router = require('express').Router();
const {registerSubmit, loginSubmit, getLoggedInUser, logOutUser} = require('../controllers/authController');

router.post('/register', registerSubmit);

router.post('/login', loginSubmit);

router.get('/loggedIn', getLoggedInUser);

router.get('/logout', logOutUser);

module.exports = router;