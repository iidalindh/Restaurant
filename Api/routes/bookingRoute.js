const router = require('express').Router();

router.post('/booking', (req, res) => {
    console.log(req.body);
});

module.exports = router;