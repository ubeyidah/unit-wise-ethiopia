const protectRoute = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    req.user.isPaid &&
    !req.user.isBlock &&
    req.user.studyType
  ) {
    return next();
  }
  res.redirect(process.env.CLIENT_URL + "signin");
  // res.json({ m: "login first" });
};

export default protectRoute;
