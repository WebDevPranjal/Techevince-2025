const ProjectModel = require('../model/project');
const projectRouter = require('express').Router();

projectRouter.get('/:category', async (req, res) => {
    const members = await ProjectModel.find({ category: req.params.category }).populate('club');
    res.json(members);
});

module.exports.projectRouter = projectRouter;