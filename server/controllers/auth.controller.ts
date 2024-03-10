import db from "../model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { TSignUpPayload, TSigninPayload } from "../types/payload";

const User = db.user;
const Role = db.role;

export const signUp: RequestHandler<unknown, unknown, TSignUpPayload> = async (
  req,
  res
) => {
  try {
    const { roles, ...userDetails } = req.body;
    const user = new User({
      ...userDetails,
      password: bcrypt.hashSync(userDetails.password, 8),
    });

    await user.save();
    if (roles) {
      const rolesDB = await Role.find({
        name: { $in: roles },
      });
      user.roles = rolesDB.map((role) => role._id);
    } else {
      const roleDB = await Role.findOne({ name: "user" });
      console.log(roleDB);
      user.roles = [roleDB!._id];
    }
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export const signin: RequestHandler<unknown, unknown, TSigninPayload> = async (
  req,
  res
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    }).populate("roles");

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const pwIsValid = bcrypt.compareSync(password, user.password);
    if (!pwIsValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET!, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: process.env.JWT_EXPIRTION,
    });

    let entitlements: string[] = [];
    user.roles.forEach((role) => {
      entitlements.push(`ROLE_${(role as any).name.toUpperCase()}`);
    });

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: entitlements,
      accessToke: token,
    });
  } catch (error) {
    console.error(error);
  }
};
