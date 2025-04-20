const TeamModel = require('../model/teams');

const teamRouter = require('express').Router();

teamRouter.get('/', async (req, res) => {
    const members = await TeamModel.find();
    members.sort((a, b) => a.orderBy - b.orderBy);
    res.json(members);
});

module.exports.teamRouter = teamRouter;