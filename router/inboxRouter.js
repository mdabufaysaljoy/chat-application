// * extarnal imports
const router = require("express").Router();

// * internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlRespone = require("../middleware/common/decorateHtmlResponse");

router.get("/", decorateHtmlRespone("Inbox"), getInbox);

module.exports = router;
