const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const PORT = 3000;

const app = express();
app.use(express.json());
let db;

const handlerError = (res, error) => {
  res.status(500).json({ error });
};

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log(`Listening port ${PORT}`);
    });
    db = getDb();
  } else {
    console.log(`DB connection error: ${err}`);
  }
});

app.get("/movies", (req, res) => {
  const movies = [];
  db.collection("movies")
    .find()
    .sort({ title: 1 })
    .forEach((movie) => {
      movies.push(movie);
    })
    .then(() => {
      res.status(200).json(movies);
    })
    .catch(() => handlerError(res, "Something goes wrong..."));
});

app.get("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch(() => handlerError(res, "Something goes wrong..."));
  } else {
    handlerError(res, "Wrong id");
  }
});

app.post("/movies", (req, res) => {
  db.collection("movies")
    .insertOne(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => handlerError(res, "Something goes wrong..."));
});

app.patch("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .updateOne({ _id: ObjectId(req.params.id) }, {$set: req.body})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => handlerError(res, "Something goes wrong..."));
  } else {
    handlerError(res, "Wrong id");
  }
});

app.delete("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => handlerError(res, "Something goes wrong..."));
  } else {
    handlerError(res, "Wrong id");
  }
});

