const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animeSchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    mal_id:{
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true,
    }
},{ timestamps: true })

module.exports = mongoose.model('Anime', animeSchema);