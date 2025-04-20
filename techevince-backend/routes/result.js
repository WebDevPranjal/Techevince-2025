const { User: UserModel } = require("../model/user.schema");
const ProjectModel = require("../model/project");

const resultRouter = require("express").Router();

// Get total number of businessVote, softwareVote, hardwareVote of each project in csv format
resultRouter.get("/csv", async (req, res) => {
  const projects = await ProjectModel.find();
  const businessVotes = [];
  const softwareVotes = [];
  const hardwareVotes = [];
  Promise.all(
    projects.map(async (project) => {
      if (project.category === "business") {
        const businessVote = await UserModel.find({
          businessVote: project._id,
        });
        businessVotes.push({
          name: project.name,
          votes: businessVote.length,
        });
      } else if (project.category === "software") {
        const softwareVote = await UserModel.find({
          softwareVote: project._id,
        });
        softwareVotes.push({
          name: project.name,
          votes: softwareVote.length,
        });
      } else if (project.category === "hardware") {
        const hardwareVote = await UserModel.find({
          hardwareVote: project._id,
        });
        hardwareVotes.push({
          name: project.name,
          votes: hardwareVote.length,
        });
      }
    })
  ).then(() => {
    let csv = "Business Votes\n";
    businessVotes.forEach((project) => {
      csv += `${project.name},${project.votes}\n`;
    });
    csv += "\nSoftware Votes\n";
    softwareVotes.forEach((project) => {
      csv += `${project.name},${project.votes}\n`;
    });
    csv += "\nHardware Votes\n";
    hardwareVotes.forEach((project) => {
      csv += `${project.name},${project.votes}\n`;
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=results.csv");
    res.send(csv);
  });
});

// Get users who voted for each project with project name and roll number
resultRouter.get("/users", async (req, res) => {
  const projects = await ProjectModel.find();
  const users = await UserModel.find().populate("businessVote").populate("softwareVote").populate("hardwareVote");
  let csv = "User, Roll Number, softwareVote, hardwareVote, businessVote\n";
  users.forEach((user) => {
    csv += `${user.name},${user.rollno},`;
    if (user.softwareVote) {
      csv += `${user.softwareVote.name},`;
    } else {
      csv += ",";
    }
    if (user.hardwareVote) {
      csv += `${user.hardwareVote.name},`;
    } else {
      csv += ",";
    }
    if (user.businessVote) {
      csv += `${user.businessVote.name},`;
    } else {
      csv += ",";
    }
    csv += "\n";
  });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=users.csv");
  res.send(csv);
});

module.exports.resultRouter = resultRouter;
