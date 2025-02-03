import express from "express";
import { createCourse, deleteCourse, editCourse, getAllUsers, myCourses } from "../controllers/courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllCourse } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/createcourse", adminAuth, createCourse);
router.get("/mycourses",adminAuth,myCourses)
router.delete("/mycourse/delete/:id",adminAuth,deleteCourse)
router.put("/mycourse/edit/:id",adminAuth,editCourse)
router.get("/myusers",adminAuth,getAllUsers)
router.get("/all",getAllCourse)

export default router;
