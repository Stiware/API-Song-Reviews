const express = require('express')
const mongoose = require('mongoose')
const Review = require('./model/Review')
const artistData = require('./model/artistData')
const env = require('dotenv/config')
const z = require('zod')


// const songs = require('./sr.json')
const app = express()

//middleware to parse json from req.body
app.use(express.json())

app.disable('x-powered-by')

const PORT = process.env.PORT || 3000
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cjsr3gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => console.log('Database connected!')).catch((err) => console.log(err))


// Routes get

//get all reviews
app.get('/reviews', async (req, res) => {
    let allreviews = await Review.find({})
    res.json(allreviews).status(200)
})
//get review by id
app.get('/review/:id', async (req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({message: 'Id is required'})

    await Review.findById(id).then((song) => res.json(song)).catch((err) => res.status(404).json({message: err.message, status: 404}))
})

//get all albums by artist
app.get('/reviews/artist', async (req, res) => {
    const { artist } = req.query
    if(artist){
        await artistData.find({"name": artist}).then((album) => res.json(album)).catch((err) => res.status(404).json({message: err.message, status: 404}))
    }   
    else{
        await artistData.find({}).then((album) => res.json(album)).catch((err) => res.status(404).json({message: err.message, status: 404}))
    }
})


//get reviews by artist
app.get('/reviews/artist',async (req, res) => {
    const { artist } = req.query
    if(artist){
        await artistData.find({"name": artist}).then((album) => res.json(album)).catch((err) => res.status(404).json({message: err.message, status: 404}))
    }   
    else{
        await artistData.find({}).then((album) => res.json(album)).catch((err) => res.status(404).json({message: err.message, status: 404}))
    }
    
})

// Routes post
app.post('/review', async (req,res)=>{
    try{
        const { user,song_details } = req.body
            
        const { song_name, artist, album, album_cover, genre, year, rating, review } = song_details
        let newReview  = new Review({user, song_details})
        await newReview.save()
        
        // Here i save the artist in the artistData model, the model contains only the name of the artist and the albums that he has
        await artistData.find({"name": artist}).then((data) => {
            if(data.length === 0){
                let newArtist = new artistData({name: artist, albums: [{name: album, cover: album_cover}]})
                newArtist.save()
            }
            else{
                let albumList = data[0].albums
                let exists = false
                for (let i of albumList){
                    if(i.name === album){
                        exists = true
                    }
                }
                if(!exists){
                    data[0].albums.push({name: album, cover: album_cover})
                    data[0].save()
                }
            }
        })
        res.status(201).json({message: 'New review added'})

    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
})

// Routes put
//Edit more fields of a review
app.put('/review/:id', (req, res) => {

    const id = req.params.id
    const editReview = req.body
    Review.findByIdAndUpdate(id, editReview)
    .then((data) => 
    {
        res.json(data).status(200)
    })
    .catch((err) => 
    {
        res.status(500).json({message: err.message})
    })
}
)
    // res.send(editReview)

// Routes patch
//Edit only one field of a review
app.patch('/review/:id', (req, res) => {
    const id = req.params.id
    const newSong = req.body
    const index = songs.data.findIndex(song => song.id === id)
    songs.data[index] = newSong
    res.json(songs)}
)


// Routes delete
app.delete('/review/:id', async (req, res) => {
    const { id } = req.params
    await Review.findByIdAndDelete(id)
    res.json({message: 'Review deleted'}).status(200)
})

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})