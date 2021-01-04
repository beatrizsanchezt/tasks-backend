const sql = require('mssql');

function taskInstanceTimerRepository({ dataClient }) {
  async function createTaskInstanceTimer(timerRecord) {
    const pool = await dataClient.getConnection();
    const request = await pool.request();

    request.input('task_instance_id', sql.Int, timerRecord.task_instance_id);
    request.input('start_time', sql.DateTime, timerRecord.start_time);
    request.output('response', sql.VarChar);

    return new Promise((resolve, reject) => {
      request.execute('SPInsertTaskInstanceTimer', (error, result) => {
        if (error !== null && error !== undefined) {
          reject(error);
        } else {
          const res = result.output.response == null ? '[]' : result.output.response;
          resolve(res);
        }
      });
    });
  }

  async function updateTaskInstanceTimer(taskInstanceTimerId, updatedRecord) {
    const pool = await dataClient.getConnection();
    const request = await pool.request();

    request.input('task_instance_timer_id', sql.Int, taskInstanceTimerId);
    request.input('end_time', sql.DateTime, updatedRecord.end_time);
    request.input('finished', sql.Int, updatedRecord.finished);
    request.output('response', sql.VarChar);

    return new Promise((resolve, reject) => {
      request.execute('SPUpdateTaskInstanceTimer', (error, result) => {
        if (error !== null && error !== undefined) {
          reject(error);
        } else {
          const res = result.output.response == null ? '[]' : result.output.response;
          resolve(res);
        }
      });
    });
  }

  return {
    createOne: createTaskInstanceTimer,
    updateOne: updateTaskInstanceTimer,
  };
}

module.exports = taskInstanceTimerRepository;
