function requireUser(req, res, next) {
    if(!req.user) {
      res.status(401);
      next({
        name: "Missing The User Error",
        message: "You must be logged in to perform this action"
      });
    }
    else {next();}
  }
  
  function requireAdmin(req, res, next) {
    if(!req.user.isadmin) {
      res.status(401);
      next({
        name: "Missing Access to Admin Controls...",
        message: "You must be a admin to perform this action"
      });
    }
    else {next();}
  }
  module.exports = {
    requireUser,
    requireAdmin
  }