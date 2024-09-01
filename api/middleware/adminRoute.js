const adminRoutes = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  res.redirect(process.env.CLIENT_URL + "signin");
  // res.json({ m: "not admin person" });
};

export default adminRoutes;
