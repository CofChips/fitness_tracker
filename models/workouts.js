const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate()),
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'exercises'
    }
  ]
})


const Workout = mongoose.model("workouts", WorkoutSchema);

module.exports = Workout;
