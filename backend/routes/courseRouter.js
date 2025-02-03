import express from "express";
import { createCourse, myCourses } from "../controllers/courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllCourse } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/createcourse", adminAuth, createCourse);
router.get("/mycourses",adminAuth,myCourses)
router.get("/all",getAllCourse)

export default router;
