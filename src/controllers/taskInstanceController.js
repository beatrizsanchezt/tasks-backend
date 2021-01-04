function taskInstanceController({ taskInstanceService, httpErrors }) {
  async function getAll(req, res) {
    const tasks = await taskInstanceService.getAll();
    return res.json(tasks);
  }

  async function updateOne(req, res, next) {
    const result = await taskInstanceService.updateOne(req.params, req.body);
    if (result) {
      return res.json(result);
    }

    return next(httpErrors.notFound('task not found'));
  }
  return {
    getAll,
    updateOne,
  };
}

module.exports = taskInstanceController;
