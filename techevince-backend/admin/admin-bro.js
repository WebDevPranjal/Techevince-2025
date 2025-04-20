const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminModel = require('../model/admin');
const bcrypt = require('bcryptjs');
AdminJS.registerAdapter(require('@adminjs/mongoose'));

const Clubs = require('../model/clubs');
const Gallery = require('../model/gallery');
const Judges = require('../model/judges');
const Projects = require('../model/project');
const Teams = require('../model/teams');
const { User } = require('../model/user.schema');
const Admin = require('../model/admin');
const Perm = require('../model/perm');

// add authentication

const adminJS = new AdminJS({
  resources: [Clubs, Gallery, Judges, Projects, Teams, User, Admin, Perm],
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  branding: {
    companyName: 'Admin',
    softwareBrothers: false,
  },
});



const authenticate = async (email, password) => {
  console.log(email, password);
  const admin = await AdminModel.findOne({ username: email });
 console.log(admin);
  if (admin) {
    console.log(admin)
    //const matched = await bcrypt.compare(password, admin.password);

    if (password===admin.password) {
      console.log("mathced")
      return admin
     
    }
    else{
      console.log("notmatched")
    }
  }
  return null
}

const router = session => AdminJSExpress.buildAuthenticatedRouter(adminJS, {
  authenticate,
  cookieName: 'adminjs',
  cookiePassword: 'sessionsecret',
}, null, session);
module.exports.router = router;