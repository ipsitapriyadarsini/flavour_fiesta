import db from "../model";
import { RequestHandler } from "express";
import { TSignUpPayload } from "../types/payload";

const User = db.user;

export const duplicateUsername: RequestHandler<
  unknown,
  unknown,
  TSignUpPayload
> = async (req, res, next) => {
  const { username } = req.body;

  try {
    const userWithUsername = await User.findOne({ username });

    if (userWithUsername) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();
  } catch (err: unknown) {
    res.status(500).send({ message: err });
    return;
  }
};

export const verifySignUp = {
  duplicateUsername,
};

export default verifySignUp;
