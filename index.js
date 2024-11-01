const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./routes/Contact");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api", Contact);