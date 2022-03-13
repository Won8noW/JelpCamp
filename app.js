const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCampDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'))

app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground});
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})