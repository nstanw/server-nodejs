const express = require('express');
const googleAccountController = require('../controller/acc');
const router = express.Router();


router.post('/', googleAccountController.addGoogleAccount);
router.get('/', googleAccountController.getAllGoogleAccounts);
// router.get('/:id', googleAccountController.getGoogleAccount);
router.patch('/:id', googleAccountController.updateGoogleAccount);
router.delete('/:id', googleAccountController.deleteGoogleAccount);

module.exports = router;