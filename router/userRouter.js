// * extarnal imports
const router = require("express").Router();

// * internal imports
const { getUser, addUser } = require("../controller/userController");
const decorateHtmlRespone = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/user/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middleware/user/userValidator");

router.get("/", decorateHtmlRespone("Users"), getUser);
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

module.exports = router;
