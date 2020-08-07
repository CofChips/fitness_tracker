const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// code

// html routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});


// api routes

// for displaying last workout
app.get("/api/workouts/", (req, res) => {
    db.Workout.find({})
        .populate("exercises")
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// chart display
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// for creating new workouts
app.post("/api/workouts", (req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

// creates new entries in the exercise table and adds the id to the relevant workout entry
app.put("/api/workouts/:id", (req, res) => {
    var find = { _id: req.params.id };
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate(find, { $push: { exercises: _id } }, { new: true }))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});