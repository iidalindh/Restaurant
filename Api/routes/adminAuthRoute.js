const router = require('express').Router();
const {
    addAdmin,
    getAdmins,
    editAdmin,
    deleteAdmin,
    loginAdmin,
    getAdminById
} = require('../controllers/adminAuthController');
const Admin = require("../middleware/admin")

router.post('/login', loginAdmin);

router.post('/admins', Admin, addAdmin);
router.get('/admins', Admin, getAdmins);
router.get('/admins/:id', Admin, getAdminById);
router.put('/admins/:id', Admin, editAdmin);
router.delete('/admins/:id', Admin, deleteAdmin);


module.exports = router;
