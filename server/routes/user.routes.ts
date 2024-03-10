import { Router } from "express";

import authJwt from "../middlewares/authjwt";
import {
  adminBoard,
  allAccess,
  userBoard,
} from "../controllers/user.controller";

const router = Router();

router.get("/public", allAccess);
router.get("/user", [authJwt.verifyToken], userBoard);
router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isUserEntitled("admin")],
  adminBoard
);

export default router;
