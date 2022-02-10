const express = require('express');
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

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/campground', async (req, res) => {
    const camp = new Campground({ title: "My Background"})
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})