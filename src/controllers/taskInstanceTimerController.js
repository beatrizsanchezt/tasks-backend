function taskInstanceTimerController({ taskInstanceTimerService, httpErrors }) {
  async function createOne(req, res, next) {
    const timerRecord = req.body;
    const result = await taskInstanceTimerService.createOne(timerRecord);
    if (result) {
      return res.json(JSON.parse(result));
    }

    return next(httpErrors.notFound('task not found'));
  }
  return {
    createOne,
  };
}

module.exports = taskInstanceTimerController;
