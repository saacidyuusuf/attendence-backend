function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("not allowed");
    }
    next()
  };
};

module.exports = {
  checkAuthenticated,
  authRole,
};
