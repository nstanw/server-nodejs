const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router.get("/", userController.getAllUser);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;