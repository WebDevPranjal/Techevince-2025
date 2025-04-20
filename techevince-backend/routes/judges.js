const JudgeModel = require('../model/judges');

const judgeRouter = require('express').Router();

judgeRouter.get('/', async (req, res) => {
  const members = await JudgeModel.find();
  members.sort((a, b) => a.orderBy - b.orderBy);
  res.json(members);
});

module.exports.judgeRouter = judgeRouter;