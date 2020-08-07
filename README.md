# fitness_tracker

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
![GitHub repo size](https://img.shields.io/github/repo-size/CofChips/fitness_tracker)

## Description
Fitness Tracker is a fitness app that allows users to enter their exercise data.

![Image](./additional-optional/Fitness_Tracker.gif)

## Table of Contents
* [Background](#background)
* [Approach](#approach)
* [Tools](#tools)
* [Site](#site)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)
* [Authors](#authors)

## Background
The objective of this project was to build the application backend using MongoDB and Mongoose.

Acceptance criteria is as follows:

```
The user should be able to:

  * Add exercises to a previous workout plan.

  * Add new exercises to a new workout plan.

  * View multiple the combined weight of multiple exercises on the `stats` page.

```

## Approach
The project featured the below areas of focus:
1) Setting up the MongoDB schema
2) Setting up server routes

### MonogoDB schema and setting up server routes
The app was built using a MongoDB schema. There are two models, exercises and workouts. Populate was utilized to "connect" the two tables.

```
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
```
As shown above, the workout schema makes reference to the exercise schema. The below route is used to add exercise ids to relevant workout entries.

```
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
```

## Tools

* [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [jquery](https://jquery.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [express](https://expressjs.com/)
* [morgan](https://www.npmjs.com/package/morgan)

## Site

* [See Live Site](https://floating-coast-42118.herokuapp.com/)

## License
MIT

## Contributing
Contributors are welcome. Please contact for further details.

## Questions
If you have any questions regarding this project, please email me at: qiwei.mod@gmail.com

## Authors

* **CHRISTOPHER LEE** 

- [Link to Github](https://github.com/CofChips)
- [Link to LinkedIn](https://www.linkedin.com/in/christophernlee/)
