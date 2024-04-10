const express = require("express");
const giaoDichController = require("../controller/giaoDich");
const router = express.Router();

router.post("/", giaoDichController.addGiaoDich);
router.get("/", giaoDichController.getAllGiaoDich);

module.exports = router;