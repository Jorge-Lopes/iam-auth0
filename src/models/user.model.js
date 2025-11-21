import query from "../services/database.service.js";

const getUserByName = async (name) => {
  const queryUser = "SELECT * FROM users WHERE name = $1";
  const result = await query(queryUser, [name]);
  return result?.rows?.[0];
};

const getRoleByName = async (name) => {
  const queryRole = "SELECT * FROM roles WHERE name = $1";
  const result = await query(queryRole, [name]);
  return result?.rows?.[0];
};

const insertUserRole = async (userId, roleId) => {
  const queryUserRoles =
    "INSERT INTO user_roles (userID, roleID) VALUES ($1, $2);";
  await query(queryUserRoles, [userId, roleId]);
};

export { getUserByName, getRoleByName, insertUserRole };
