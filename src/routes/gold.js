const express = require('express');
const router = express.Router();
const goldController = require('../controller/gold');
const myIP = require('../utils/getIp');

router.get('/setSoLuongGold', goldController.setSoLuongGold);
router.get('/get_vg_store_items/user_account', goldController.setSoLuongGoldWhenLoadingPlow);
router.get('/points/spend', goldController.cayGold);
router.get('/', async (req, res) => {
    let ip = await myIP();
    res.send(ip);
}

);

module.exports = router;