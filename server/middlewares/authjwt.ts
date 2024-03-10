import jwt from "jsonwebtoken";
import db from "../model";
import { RequestHandler, Request } from "express";

const User = db.user;
const Role = db.role;

export type TRequestWithUser = Request & {
  userId?: string;
};

export const verifyToken: RequestHandler = (
  req: TRequestWithUser,
  res,
  next
) => {
  let token = req.headers["x-access-token"] as string;
  console.log("Token: ", token);

  if (!token) return res.status(403).json({ message: "User not authorized!" });

  jwt.verify(token, process.env.AUTH_SECRET!, (err, decoded) => {
    if (err) {
      console.log("Err : ", err);
      return res.status(401).send({
        message: "User not authorized!",
      });
    }
    req.userId = (decoded as { id: string }).id;
    next();
  });
};

export const isUserEntitled =
  (entitlement: string): RequestHandler =>
  async (req: TRequestWithUser, res, next) => {
    try {
      const { userId } = req;
      const user = await User.findById(userId);

      if (user) {
        const roles = await Role.find({
          _id: { $in: user.roles },
        });
        for (let role of roles) {
          console.log(role, entitlement);
          if (role.name === entitlement) {
            next();
            return;
          }
        }
        res
          .status(403)
          .json({ message: "Your are not having require entitlement" });
        return;
      }
    } catch (err: unknown) {
      res.status(500).send({ message: err });
      return;
    }
  };

const authjwt = { verifyToken, isUserEntitled };

export default authjwt;
