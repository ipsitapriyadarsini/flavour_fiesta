import { Router } from "express";

import verifySignup from "../middlewares/verifySignUp";
import { signUp, signin } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", [verifySignup.duplicateUsername], signUp);
router.post("/signin", signin);

export default router;
