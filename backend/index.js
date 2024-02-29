require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//importing routes
const animeRoutes = require('./routes/animeRoutes');

const app = express();

//JSON middleware
app.use(express.json());
// logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//allow all origins
app.use(cors());


//Routes
app.use('/api/animeRoutes', animeRoutes);


//connect to mongoDB via Mongoose
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        //Listening to requests
        app.listen(PORT, () => {
            console.log('Server is running on Port: ', PORT);
        });
    })
    .catch((err) => console.log("Error connecting to Database: ", err.message));
