const router = require('express').Router();
const {addAdmin, getAdmins, editAdmin, deleteAdmin, loginAdmin} = require('../controllers/adminAuthController');
const Admin = require("../middleware/admin")

router.post('/login', loginAdmin);

router.post('/admins', Admin, addAdmin);
router.get('/admins',Admin, getAdmins);
router.put('/admins/:id', Admin, editAdmin);
router.delete('/admins/:id', Admin, deleteAdmin);


module.exports = router;
