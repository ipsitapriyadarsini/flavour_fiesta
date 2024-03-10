import db from "../model";

export const seedRoles = () => {
  const Role = db.role;

  Role.estimatedDocumentCount().then((count) => {
    if (count) return;

    new Role({
      name: "user",
    })
      .save()
      .catch(() => console.error("Error while adding 'user' role"));

    new Role({
      name: "admin",
    })
      .save()
      .catch(() => console.error("Error while adding 'admin' role"));
  });
};
