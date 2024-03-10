import role from "./role";
import user from "./user";
import recipe from "./recipe";

const db = {
  role,
  user,
  recipe,
  ROLES: ["user", "admin"],
};

export default db;
