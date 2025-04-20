const passport = require("passport");
const azureStrategy = require("./azureStrategy");

passport.serializeUser((user, done) => {
  // console.log(`\n--------> Serialize User:`)
  // console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("\n--------- Deserialized User:")
  // console.log(user);
  done(null, user);
});

passport.use("azure", azureStrategy);