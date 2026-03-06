import express from "express";
import dotenv from "dotenv";
import { search } from "./controllers/searchController.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3097;
const app = express();

app.use(cors());

app.get("/search", (req, res) => search(req, res));

app.listen(port, () => {
  console.log("App Listening on port:", port);
});
