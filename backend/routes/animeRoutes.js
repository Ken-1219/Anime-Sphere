const express = require('express');
const { addAnime, getAnime, deleteAnime, findAnime } = require('../controllers/animeController');

const router = express.Router();

//to get a list of user's added animes
router.get('/getAnime', getAnime);


//to add anime
router.post('/anime/:mal_id', addAnime);


//delete an anime from my-anime list
router.delete('/myAnime/:id', deleteAnime);

//to find an anime from the database
router.get('/findAnime', findAnime);

module.exports = router;
