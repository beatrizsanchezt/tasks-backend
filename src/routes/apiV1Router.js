const express = require('express');

function apiV1Router({ taskInstanceController }) {
  return express.Router().use(
    '/api/v1',
    express
      .Router()
      // task instance endpoints
      .get('/taskinstance', taskInstanceController.getAll)
      .patch('/taskinstance/:id', taskInstanceController.updateOne)
  );
}

module.exports = apiV1Router;
