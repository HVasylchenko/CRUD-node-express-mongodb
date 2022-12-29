const express = require("express");

const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie-controller");

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovie);
router.post("/movies", addMovie);
router.patch("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

module.exports = router;
