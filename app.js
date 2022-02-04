const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=> {
    console.log("Database Connected")
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'))

app.get('/', (req,res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})