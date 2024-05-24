const mongoose = require('mongoose')
    
const songReviews = new mongoose.Schema({
    user: {
        userName: String,
        userId: String,
        userImage: String
    },
    song_details:{
        song_name: String,
        artist: String,
        album: String,
        album_cover: String,
        genre: String,
        year: Number,
        rating: Number,
        review: String
    }
})


module.exports = mongoose.model("review", songReviews)



// await SR.findById('664e04d280ca255d96eb2428').then((data) => console.log(data))

