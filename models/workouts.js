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
}, {
  toJSON: {
    virtuals: true
  }
});

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((acc, curr) => {
    return acc + curr.duration
  }, 0);
})

const Workout = mongoose.model("workouts", WorkoutSchema);

module.exports = Workout;
