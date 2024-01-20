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
//to allow cross-origin requests
// app.use(cors({ origin: 'https://anime-sphere-frontend.vercel.app/' }));


//Routes
app.use('/api/animeRoutes', animeRoutes);


//connect to mongoDB via Mongoose
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        //Listening to requests
        app.listen(process.env.PORT, () => {
            console.log('Server is running on Port: ', process.env.PORT);
        });
    })
    .catch((err) => console.log("Error connecting to Database: ", err.message));
