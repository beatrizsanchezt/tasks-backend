const sql = require('mssql');

function taskInstanceTimerRepository({ dataClient }) {
  async function createTimerRecord(timerRecord) {
    const pool = await dataClient.getConnection();
    const request = await pool.request();

    request.input('task_instance_id', sql.Int, timerRecord.task_instance_id);
    request.input('start_date', sql.DateTime, timerRecord.start_date);
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

  return {
    createOne: createTimerRecord,
  };
}

module.exports = taskInstanceTimerRepository;
