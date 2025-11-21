const verifyRole = (expectedRoles) => {
  return (req, res, next) => {
    const userRoles = req.oidc.user?.["https://my-app.example.com/roles"] || [];

    const hasRole = userRoles.some((role) => expectedRoles.includes(role));

    if (hasRole) {
      return next();
    } else {
      return res.status(403).send("Invalid role");
    }
  };
};

export default verifyRole;
