const GalleryModel = require('../model/gallery');

const galleryRouter = require('express').Router();

galleryRouter.get('/:use', async (req, res) => {
  const members = await GalleryModel.find({ useCase: req.params.use});
  members.sort((a, b) => a.orderBy - b.orderBy);
  res.json(members);
});

module.exports.galleryRouter = galleryRouter;