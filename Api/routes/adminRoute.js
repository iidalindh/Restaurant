const router = require('express').Router();
const {registerSubmit, loginAdmin, getLoggedInUser} = require('../controllers/adminAuthController');

router.post('/login', registerSubmit);

router.post('/login', loginAdmin);

router.get('/loggedIn', getLoggedInUser);

module.exports = router;
