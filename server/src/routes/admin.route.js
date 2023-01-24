import express from "express";

// Controller
import { getAllAgent, deleteAgent } from "../controller/agent.controller.js";

// Helper
import { verifyAccessToken } from "../helper/jwtHelper.js"

const router = express.Router();

router.route("/agent").get(verifyAccessToken, getAllAgent);
router.route("/agent").delete(verifyAccessToken, deleteAgent);

export default router;