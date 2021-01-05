function taskInstanceService({ taskInstanceRepository }) {
  async function getAll(userId) {
    return taskInstanceRepository.getAll(userId);
  }

  function updateOne(taskInstanceId, updatedTask) {
    return taskInstanceRepository.updateOne(taskInstanceId, updatedTask);
  }
  return {
    getAll,
    updateOne,
  };
}

module.exports = taskInstanceService;
