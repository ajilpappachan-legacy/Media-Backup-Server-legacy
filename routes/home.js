const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.DESTINATION);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
	res.render("upload");
});

router.get("/files", (req, res) => {
	res.render("files");
});

router.post("/upload", upload.array("files"), (req, res) => {
	res.send("Uploaded");
});

module.exports = router;
