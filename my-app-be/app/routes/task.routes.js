module.exports = (app) => {
  const tasks = require('../controllers/task.controller');

  let router = require('express').Router();

  // crud
  // create a task*
  router.post('/', tasks.create);

  // retrieve all tasks*
  router.get('/', tasks.findAll);

  // retrieve a single task
  router.get('/:id', tasks.findOne);

  // update a task
  router.put('/:id', tasks.update);

  // delete a task
  router.delete('/:id', tasks.delete);

  // delete all tasks
  router.delete('/', tasks.deleteAll);

  // mount
  app.use('/api/tasks', router);
};
