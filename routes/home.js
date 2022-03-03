const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const { readdir } = require("fs/promises");
const path = require("path");
const mime = require("mime");

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

router.use(express.static(process.env.DESTINATION));

router.get("/", (req, res) => {
	res.render("upload");
});

router.get("/files/:folder?", async (req, res) => {
	const folder = req.params.folder
		? Buffer.from(req.params.folder, "base64").toString("ascii")
		: "";
	const data = await readdir(path.join(process.env.DESTINATION, folder));
	const files = data.map((file) => {
		const mimeType = mime.getType(file);
		const type = mimeType ? mimeType.split("/")[0] : undefined;
		return {
			name: file,
			href: `${folder ? folder + "/" : ""}${file}`,
			type: type,
			isDirectory: path.parse(file).ext === "",
			folder: Buffer.from(path.join(folder, file)).toString("base64"),
		};
	});
	console.log(files);
	res.render("files", { files });
});

router.post("/upload", upload.array("files"), (req, res) => {
	res.render("completed");
});

module.exports = router;
