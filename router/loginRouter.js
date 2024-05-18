// * extarnal imports 
const router = require('express').Router()

// * internal imports
const {getLogin} = require("../controller/loginController")
const decorateHtmlRespone = require("../middleware/common/decorateHtmlResponse");

router.get('/',decorateHtmlRespone("Login"), getLogin)

module.exports = router