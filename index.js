const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const homeRouter = require("./routes/home");
const privateRouter = require("./routes/private");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/private", privateRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("listening on port " + port);
});
