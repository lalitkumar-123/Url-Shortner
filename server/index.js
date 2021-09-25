const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Shorturl = require('./dbschema');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/urlShortener",{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.post("/", async (req, res) => {
    const exists = await Shorturl.findOne({full : req.body.link});
    if(exists != null) return;
    await Shorturl.create({full: req.body.link});
    res.redirect("/");
})

app.post("/delete", async (req, res) => {
    const exists = await Shorturl.findOne({full : req.body.link});
    if(exists != null) return;
    await Shorturl.deleteOne({full: "https://www.codegrepper.com/"});
    res.redirect("/");
})


app.get("/", async (req, res) => {
    const shorturls = await Shorturl.find();
    res.json({shorturls});
})

app.listen(5000);