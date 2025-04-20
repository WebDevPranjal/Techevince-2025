const AzureStrategy = require("passport-azure-ad-oauth2").Strategy;
const { User } = require("../model/user.schema");
const jwt = require("jsonwebtoken");

const azureStrategy = new AzureStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    resource: process.env.RESOURCE,
    tenant: process.env.TENANT,
    state: false,
  },
  async (accessToken, refreshToken, params, profile, done) => {
    try {
      const decoded = jwt.decode(accessToken);
      const obj = {
        name: decoded.name,
        rollno: decoded.family_name,
        email: decoded.unique_name,
        accessToken,
        refreshToken,
      }
      const user = await User.findOne({ email: obj.email});
      if (user) {
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
        done(null, user);
       
      } else {
        const newUser = new User(obj);
        await newUser.save();
        done(null, newUser);
      }
    } catch (err) {
      done(err, null);
    }
  }
);

module.exports = azureStrategy;