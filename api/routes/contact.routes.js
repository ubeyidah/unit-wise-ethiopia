import express from "express";
import { contact } from "../controllers/contact.controller.js";
const router = express.Router();

router.post("/", contact);
export default router;
