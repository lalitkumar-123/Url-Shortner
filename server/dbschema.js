const mongoose = require('mongoose');
const generatetId = require('shortid');

const shorturl = new mongoose.Schema({
    full : {
        type : String,
        required : true,
    },
    short : {
        type : String,
        required : true,
        default : generatetId.generate,
    }
})

module.exports = mongoose.model("Shorturl", shorturl);