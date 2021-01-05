function taskInstanceController({ taskInstanceService, httpErrors }) {
  async function getAll(req, res) {
    const { id } = req.params;
    console.log(req.params);
    const tasks = await taskInstanceService.getAll(id);
    return res.json(JSON.parse(tasks));
  }

  async function updateOne(req, res, next) {
    const updatedTask = req.body;
    const { id } = req.params;
    const result = await taskInstanceService.updateOne(id, updatedTask);
    if (result) {
      return res.json(JSON.parse(result));
    }

    return next(httpErrors.notFound('task instance not found'));
  }

  return {
    getAll,
    updateOne,
  };
}

module.exports = taskInstanceController;
