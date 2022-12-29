const Movie = require("../models/movie");

const handlerError = (res, error) => {
  res.status(500).json({ error });
};

const getMovies = (req, res) => {
  Movie.find()
    .sort({ title: 1 })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => handlerError(res, err));
};

const getMovie = (req, res) => {
  Movie.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => handlerError(res, err));
};

const addMovie = (req, res) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => handlerError(res, err));
};

const updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handlerError(res, err));
};

const deleteMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
