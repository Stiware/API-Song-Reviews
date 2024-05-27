const mongoose = require('mongoose')
    
const songReviews = new mongoose.Schema({
    user: {
        userName:{
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        userImage:{
            type: String,
            required: true
        }
    },
    song_details: {
        song_name: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: true
        },
        album_cover: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: [0, 'Rating must be between 0 and 5'],
            max: [5, 'Rating must be between 0 and 5']
        },
        review: {   
            type: String,
            required: true,
            
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
})


module.exports = mongoose.model("review", songReviews)



// await SR.findById('664e04d280ca255d96eb2428').then((data) => console.log(data))

