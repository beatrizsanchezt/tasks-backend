require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');

function microservice({ apiV1Router, logger }) {
  function setUpExpress() {
    const app = express();

    return new Promise((resolve) => {
      app.use(cors());
      app.use(bodyParser.json());
      app.use(expressWinston.logger({ winstonInstance: logger }));
      app.use(apiV1Router);
      app.use(errorMiddleware);
      app.use(
        expressWinston.errorLogger({
          winstonInstance: logger,
          msg: '{{err.message}} {{res.statusCode}} {{req.method}}',
        })
      );

      resolve(app);
    });
  }
  return {
    setUpExpress,
  };
}

module.exports = microservice;
