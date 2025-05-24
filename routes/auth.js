const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validateInput");
router.post("/register", validate, authController.register);
router.post("/login", validate, authController.login);
router.get("/me", auth, authController.me);
router.post("/refresh", authController.refresh);
// router.post("/logout", auth, authController.logout);
router.post("/logout", authController.logout);

module.exports = router;
