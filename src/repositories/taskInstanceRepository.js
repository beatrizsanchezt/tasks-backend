const sql = require('mssql');

function taskInstanceRepository({ dataClient }) {
  async function getTasks() {
    const pool = await dataClient.getConnection();
    const request = await pool.request();
    request.input('user_id', sql.Int, 2);
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

  async function updateTask(taskInstanceId, updatedTask) {
    const pool = await dataClient.getConnection();
    const request = await pool.request();
    console.log(updatedTask, taskInstanceId);
    request.input('task_instance_id', sql.Int, taskInstanceId);
    request.input('status', sql.VarChar(1), updatedTask.status);
    request.input('scheduled_at', sql.DateTime, updatedTask.scheduled_at);
    request.input('start_date', sql.DateTime, null);
    request.input('end_date', sql.DateTime, updatedTask.end_date);
    request.input('pomodoros_total', sql.Int, updatedTask.pomodoros_total);
    request.output('response', sql.VarChar);

    return new Promise((resolve, reject) => {
      request.execute('SPupdateTaskInstance', (error, result) => {
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
    getAll: getTasks,
    updateOne: updateTask,
  };
}

module.exports = taskInstanceRepository;
