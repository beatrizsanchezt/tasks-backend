function taskInstanceTimerService({ taskInstanceTimerRepository }) {
  function createOne(taskId, timerRecord) {
    return taskInstanceTimerRepository.createOne(taskId, timerRecord);
  }
  return {
    createOne,
  };
}

module.exports = taskInstanceTimerService;
