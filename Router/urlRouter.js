const express = require("express");
const { shorternUrl, redirectUrl } = require("../controller/urlController");

const router = express.Router();

router.get("/:shortId", redirectUrl);
router.post("/shorten", shorternUrl);

module.exports = router ;