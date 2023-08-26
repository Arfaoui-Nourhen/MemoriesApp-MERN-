import bodyParser from "body-parser";
//Body-parser is the Node. js body parsing middleware.
// It is responsible for parsing the incoming request bodies in a middleware before you handle it
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import postRouter from "./routes/posts.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRouter);

// const CONNEXION_URL ="mongodb+srv://Nourhen:nourhenarfaoui123@cluster0.erj3prw.mongodb.net/memory?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

  