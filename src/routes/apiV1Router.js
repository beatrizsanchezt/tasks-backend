const express = require('express');

function apiV1Router({ taskInstanceController, taskInstanceTimerController }) {
  return express.Router().use(
    '/api/v1',
    express
      .Router()
      // task instance timer endpoints
      .post('/taskinstancetimer', taskInstanceTimerController.createOne)

      // task instance endpoints
      .get('/taskinstance', taskInstanceController.getAll)
      .patch('/taskinstance/:id', taskInstanceController.updateOne)
  );
}

module.exports = apiV1Router;
