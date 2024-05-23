const express = require('express')
const mongoose = require('mongoose')
const Review = require('./model/Review')


// const songs = require('./sr.json')
const app = express()

app.use(express.json())
app.disable('x-powered-by')

const PORT = process.env.PORT || 3000
mongoose.connect('mongodb+srv://shiro:alexander@cluster0.cjsr3gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Database connected!')).catch((err) => console.log(err))


// Routes get
app.get('/all', async (req, res) => {
    let allreviews = await Review.find({})
    res.json(allreviews).status(200)
})

app.get('/id/:id', async (req, res) => {
    let song = await Review.findById(req.params.id)
    res.json(song).status(200)
})

// Routes post
app.post('/add', async (req,res)=>{
    try{
        // res.send(req.body)
        const { song_name, artist, album, album_cover, genre, year, rating, review } = req.body
        
        if(!song_name || !artist || !album || !album_cover || !genre || !year || !rating || !review){
            return res.status(400).json({message: 'All fields are required'})
        }
        let newReview  = new Review({ song_name, artist, album, album_cover, genre, year, rating, review })
        await newReview.save()

        res.status(201).json({message: 'New review added'})
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
})

// Routes put
app.put('/update/:id', (req, res) => {

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
app.patch('/update/:id', (req, res) => {
    const id = req.params.id
    const newSong = req.body
    const index = songs.data.findIndex(song => song.id === id)
    songs.data[index] = newSong
    res.json(songs)}
)


// Routes delete
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const index = songs.data.findIndex(song => song.id === id)
    songs.data.splice(index, 1)
    res.json(songs)
})

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})