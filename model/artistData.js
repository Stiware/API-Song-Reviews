const mongoose = require('mongoose')

const artistData = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    albums: [{
        name: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        }
    }]
})
module.exports = mongoose.model("artist", artistData)