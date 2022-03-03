const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const homeRouter = require("./routes/home");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", homeRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("listening on port " + port);
});
