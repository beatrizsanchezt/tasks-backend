function taskInstanceService({ taskInstanceRepository }) {
  async function getAll() {
    return taskInstanceRepository.getAll();
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
