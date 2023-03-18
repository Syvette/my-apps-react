const db = require('../models');
const Task = db.task;
const Op = db.Sequelize.Op;

// create a task*
exports.create = (req, res) => {
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
  //query params
  // ?key=value
  // ?key=value&key2=value2
  // localhost:3002/api/tasks?desc=html&name=lean
  // req.query.description
  // req.query.name

  const description = req.query.description;
  // SELECT * FROM tasks WHERE description LIKE '%{description}%';
  let condition = description
    ? { description: { [Op.like]: `%${description}%` } }
    : null;

  Task.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || `Some error occured while retrieving tasks`,
      })
    );
};

// retrive a single task*
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot retrieve task with id='${id}'`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || `Cannot retrieve task with id=${id}`,
      })
    );
};

// update a task*
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Task was successfully updated.`,
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Task not found on record.`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || `Cannot update task with id=${id}`,
      })
    );
};

// delete a task*
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Task was successfully deleted.`,
        });
      } else {
        res.send({
          message: `Cannot delete task with id=${id}. Task not found on record.`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || `Cannot delete task with id=${id}`,
      })
    );
};

// delete all tasks*
exports.deleteAll = (req, res) => {
  const completed = req.query.completed;
  let condition =
    completed !== null || completed !== undefined
      ? { completed: { [Op.eq]: completed === 'true' ? 1 : 0 } }
      : null;

  Task.destroy({ where: condition, truncate: false })
    .then((nums) => {
      res.send({
        message: `${nums} tasks were deleted successfully.`,
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: `Some error occured during removal of all tasks.`,
      })
    );
};
