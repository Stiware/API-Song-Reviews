const mongoose = require('mongoose')

const artistData = new mongoose.Schema({
    name: String,
    albums: [{
        name: String,
        cover: String
    }]
})
module.exports = mongoose.model("artist", artistData)