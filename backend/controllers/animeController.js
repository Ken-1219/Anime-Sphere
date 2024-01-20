const express = require('express');
const mongoose = require('mongoose');
const Anime = require('../models/animeModel');


//obtain the list of my-anime
const getAnime = async (req, res) => {
    const { uid } = req.query;

    try {
        const animes = await Anime.find({ uid }).sort({ createdAt: -1 }); //find the data in the database
        res.status(200).json(animes);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}




//find an anime from the database
const findAnime = async (req, res) => {
    const { id, uid } = req.query;
    try {
        const anime = await Anime.find({ mal_id: id, uid });

        if (anime.length > 0) {
            res.status(200).json({ msg: "Anime exists." });
        } else {
            res.status(201).json({ msg: "Anime doesn't exist." });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};




//add an anime to the list of my-anime
const addAnime = async (req, res) => {
    const { title, image, score, mal_id, uid } = req.body;
    // console.log(title, image, score, mal_id, uid);

    try {
        const anime = await Anime.create({ title, image, score, mal_id, uid }); //add the anime to the database
        res.status(200).json(anime);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}





//delete anime from the my-anime list
const deleteAnime = async (req, res) => {
    const { id: mal_id } = req.params;
    const { uid } = req.query;


    //find and delete the anime
    const anime = await Anime.findOneAndDelete({ mal_id, uid });
    try {
        if (!anime) {
            return res.status(404).json({ error: "No such anime Found!" });
        }

        res.status(200).json(anime);

    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }

}




module.exports = { addAnime, getAnime, deleteAnime, findAnime };