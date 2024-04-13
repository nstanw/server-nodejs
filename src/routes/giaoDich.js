const express = require("express");
const giaoDichController = require("../controller/giaoDich");
const router = express.Router();

router.post("/", giaoDichController.addGiaoDich);
router.get("/", giaoDichController.getAllGiaoDich);
router.get("/:userId", giaoDichController.getGiaoDichByUser);

module.exports = router;