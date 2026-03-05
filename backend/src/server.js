import express from "express";
import dotenv from "dotenv";
import { searchMovie, searchMovieGenre } from "./services/movieDataService.js";

dotenv.config();

const port = process.env.PORT || 3097;
const app = express();

app.get("/search", (req,res) => searchMovie(req,res));

app.get("/newSearch",async (req, res)=>{
  res.send(await searchMovie("abc"));
})
app.listen(port, () => {
  console.log("App Listening on port:", port);
});
