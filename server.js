const express = require("express");
const mongoose = require("mongoose");
const Movie = require("./models/movie");
const movieRoutes = require('./routes/movie-routes') 

const PORT = 3000;
// const URL = "mongodb://127.0.0.1:27017/moviebox";
const URL = "mongodb+srv://Vasil:Vasil123@cluster0.nyttpno.mongodb.net/moviebox?retryWrites=true&w=majority";
// const URL = 'mongodb://localhost:27017/moviebox'; не работает

const app = express();
app.use(express.json());
app.use(movieRoutes);
mongoose.set("strictQuery", false);
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`);
  });


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});


