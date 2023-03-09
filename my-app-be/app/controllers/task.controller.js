const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// create a task*
exports.create = (req, res) => {
  //   res.send({ message: 'create: hello world!' });
  // validate request
  if (!req.body.name || !req.body.description) {
    res.status(400).send({
      message: `Name and Description cannot be empty.`,
    });
  }

  // create a task
  const task = {
    name: req.body.name,
    description: req.body.description,
  };

  // use model to save to database
  Task.create(task)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || `Some error occured while creating this task.`,
      })
    );
};

// retrieve all tasks*
exports.findAll = (req, res) => {
  // query params
  // ?keys=value
  // ?key=value&key2=value2
  // localhos:3002/api/tasks?desc=html&name=lean
  // req.query.description
  // req.query.name

  const description = req.query.description;
  // SELECT * FROM tasks WHERE description LIKE '%{description}%;
  let description = description ? {} : null;

  Task.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving tasks`,
      })
    );
};

// retrive a single task*
exports.findOne = (req, res) => {
  res.send({ message: "findOne: hello world!" });
};

// update a task*
exports.update = (req, res) => {
  res.send({ message: "update: hello world!" });
};

// delete a task*
exports.delete = (req, res) => {
  res.send({ message: "delete: hello world!" });
};

// delete all tasks*
exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll: hello world!" });
};
