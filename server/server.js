//! Import your installed npm packages:
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

//! set the server up by then enabling the use of the packages we installed
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//! Connect to our Db:
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

//! start the server:
app.listen(8080, function(){
    console.log("app running on 8080")
});

//!make a GET and POST endpoint
app.get("/", (request, response) => {
    response.json("Welcome to the home route, now get out");
});

//! make an endpoint for the db using the db name
app.get("/moviessongs", async (request, response) => {
    const moviessongs = await db.query("SELECT * FROM moviessongs")
    response.json(moviessongs.rows);
});

app.post("/moviessongs", async (request, response) => {
    const movie = request.body.movie;
    const song = request.body.song;
    const newMoviessongs = await db.query(
        "INSERT INTO moviessongs (movie, song) VALUES ($1, $2)",
        [movie, song]
    )
    response.json(newMoviessongs);
});


