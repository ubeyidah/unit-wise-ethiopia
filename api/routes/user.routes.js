import express from "express";
import { takeInfo } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/take-info", takeInfo);

export default router;
