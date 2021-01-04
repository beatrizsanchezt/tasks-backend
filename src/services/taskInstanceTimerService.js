function taskInstanceTimerService({ taskInstanceTimerRepository }) {
  function createOne(taskId, timerRecord) {
    return taskInstanceTimerRepository.createOne(taskId, timerRecord);
  }

  function updateOne(taskInstanceTimerId, updatedRecord) {
    return taskInstanceTimerRepository.updateOne(taskInstanceTimerId, updatedRecord);
  }

  return {
    createOne,
    updateOne,
  };
}

module.exports = taskInstanceTimerService;
