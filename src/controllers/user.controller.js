import setUserRole from "../services/user.service.js";
import {
  getUserByName,
  getRoleByName,
  insertUserRole,
} from "../models/user.model.js";

const userRole = async (req, res, next) => {
  const { userName, roleName } = req.body;

  if (!userName || !roleName) {
    return res.status(400).json({
      error: "Required name and role.",
    });
  }

  try {
    const user = await getUserByName(userName);
    const role = await getRoleByName(roleName);

    // Set user role in Auth0
    await setUserRole(user.auth0id, role.auth0id);
    // Set user role in postgres
    await insertUserRole(user.userid, role.roleid);

    return res.status(200).json({
      message: "User role updated successfully",
      userName,
      roleName,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to update user role.",
      details: error.message,
    });
  }
};

const userProfile = async (req, res, next) => {
  const user = {
    name: req.oidc.user.name,
    email: req.oidc.user.email,
    role: req.oidc.user["https://my-app.example.com/roles"],
  };

  res.status(200).json({ profile: user });
};

export { userProfile, userRole };
