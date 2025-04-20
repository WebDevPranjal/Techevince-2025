const router = require('express').Router();

const { authRouter } = require("./routes/auth");
const { voteRouter } = require("./routes/vote");
const { projectRouter } = require("./routes/project");
const { teamRouter } = require("./routes/team");
const { galleryRouter } = require("./routes/gallery");
// const { uploadRouter } = require("./routes/upload");
const { judgeRouter } = require("./routes/judges");
const { resultRouter } = require("./routes/result");
// // Routes
router.use("/auth", authRouter);
router.use("/vote", voteRouter);
router.use("/project", projectRouter);
router.use("/team", teamRouter);
router.use("/gallery", galleryRouter);
// router.use("/upload", uploadRouter);
router.use("/judges", judgeRouter);
router.use("/result", resultRouter);



module.exports.apiRouter = router;