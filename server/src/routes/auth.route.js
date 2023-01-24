import express from "express";

import { register, login, verifyEmail } from "../controller/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify/:token").get(verifyEmail);

export default router;