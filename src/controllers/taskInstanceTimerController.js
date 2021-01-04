function taskInstanceTimerController({ taskInstanceTimerService, httpErrors }) {
  async function createOne(req, res, next) {
    const timerRecord = req.body;
    const result = await taskInstanceTimerService.createOne(timerRecord);
    if (result) {
      return res.json(JSON.parse(result));
    }

    return next(httpErrors.notFound('task not found'));
  }

  async function updateOne(req, res, next) {
    const updatedRecord = req.body;
    const { id } = req.params;
    const result = await taskInstanceTimerService.updateOne(id, updatedRecord);
    if (result) {
      return res.json(JSON.parse(result));
    }

    return next(httpErrors.notFound('task instance timer not found'));
  }

  return {
    createOne,
    updateOne,
  };
}

module.exports = taskInstanceTimerController;
