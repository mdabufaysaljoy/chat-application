// * extarnal imports
const router = require("express").Router();

// * internal imports
const { getUser } = require("../controller/userController");
const decorateHtmlRespone = require('../middleware/common/decorateHtmlResponse')

router.get("/",decorateHtmlRespone("Users"), getUser);

module.exports = router;
