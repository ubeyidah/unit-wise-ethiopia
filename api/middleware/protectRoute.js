const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(process.env.CLIENT_URL + "signin");
};

export default protectRoute;
