import express from "express";
import { createCourse } from "../controllers/courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
const router = express.Router();

router.post("/createcourse", adminAuth, createCourse);

export default router;
