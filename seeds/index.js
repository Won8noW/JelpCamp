const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCampDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

    const seedDb = async () => {
        await Campground.deleteMany({});
        const c = new Campground({ title: "purple feild " });
        await c.save(); 
    }
    
    seedDb(); 