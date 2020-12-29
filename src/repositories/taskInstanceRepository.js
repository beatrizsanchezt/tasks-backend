const sql = require('mssql');

function taskInstanceRepository({ dataClient }) {
  async function getTasks() {
    const pool = await dataClient.getConnection();
    const request = await pool.request();
    request.output('response', sql.VarChar);

    return new Promise((resolve, reject) => {
      request.execute('SPGetTasks', (error, result) => {
        if (error !== null && error !== undefined) {
          reject(error);
        } else {
          const res = result.output.response == null ? '[]' : result.output.response;
          resolve(res);
        }
      });
    });
  }

  async function updatetask(taskId, updatedtask) {
    const pool = await dataClient.getConnection();
    const request = await pool.request();

    request.input('task_id', sql.Int, taskId);
    request.input('status', sql.VarChar(1), updatedtask.status);
    request.input('scheduled_at', sql.DateTime, updatedtask.scheduled_at);
    request.input('start_date', sql.DateTime, null);
    request.input('end_date', sql.DateTime, updatedtask.end_date);
    request.input('pomodoros_total', sql.Int, updatedtask.pomodoros_total);
    request.output('response', sql.VarChar);

    return new Promise((resolve, reject) => {
      request.execute('SPupdateTaskInstance', (error, result) => {
        if (error !== null && error !== undefined) {
          console.log(error);
          reject(error);
        } else {
          const res = result.output.response == null ? '[]' : result.output.response;
          console.log(res);
          resolve(res);
        }
      });
    });
  }

  return {
    getAll: getTasks,
    updateOne: updatetask,
  };
}

module.exports = taskInstanceRepository;
