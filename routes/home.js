const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.render("upload");
});

router.get("/files", (req, res) => {
	res.render("files");
});

module.exports = router;
