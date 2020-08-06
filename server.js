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

// app.get("/populateduser", (req, res) => {
//     db.Workout.findOne({})
//       .populate("exercises")
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .populate("exercises")
        .then(dbWorkout => {
            // console.log(dbWorkout);
            // console.log("this: ", dbWorktout[0].exercise.type)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/submit", (req, res) => {
    console.log
    db.Note.create(req.body)
        .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/api/workouts", (req, res) => {
    console.log(req.body)
    db.Workout.create(req.body)
        // .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    var find = { _id: req.params.id };
    console.log("put request: ", req.params.id)
    console.log(req.body)
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate(find, { $push: { exercises: _id } }, { new: true }))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

// /api/workouts/

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});