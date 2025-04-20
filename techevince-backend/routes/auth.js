const router = require("express").Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../utils/auth");
const { User } = require("../model/user.schema");

router.get("/current", ensureAuthenticated, async (req, res) => {
  const user = req.user;
  const mongoUser = await User.findOne({ email: user.email });
  if (!mongoUser) {
    return res.send({
      message: "User not found",
    });
  }
  return res.send(mongoUser);
});

router.get("/azureadoauth2", passport.authenticate("azure"));

router.get(
  "/azureadoauth2/callback",
  passport.authenticate("azure", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    // set cookie connect.sid

    res.cookie("connect.sid", req.sessionID, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,

    });

    res.redirect(process.env.REDIRECT_URL_FRONTEND);
    // console.log(user)
  }
);

router.get("/logout", (req, res) => {
  // req.logout();
  req.session.destroy();
  res.clearCookie("connect.sid");
  return res.send({
    message: "Logout successful",
  });
});

router.use((req, res, next) => {
  const url = req.originalUrl;
  return res.send({ url });
 
});



module.exports.authRouter = router;
