import express, { Router } from "express";
import { addLecture, adminProfile, createCourse, deleteCourse, deleteLecture, editCourse, editLecture, getAllUsers, myCourses } from "../controllers/admin_courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllCourse } from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";
const router = express.Router();

router.post("/createcourse", adminAuth,uploadFile, createCourse);
router.delete("/mycourse/delete/:id",adminAuth,deleteCourse)
router.put("/mycourse/edit/:id",adminAuth,uploadFile,editCourse)
router.get("/mycourses",adminAuth,myCourses)
router.get("/myusers",adminAuth,getAllUsers)
router.get("/myprofile",adminAuth,adminProfile)
//lectures
router.post("/addlecture/:id",adminAuth,uploadFile,addLecture)
 router.delete("/lecture/delete/:id",adminAuth,deleteLecture)
router.put("/lecture/edit/:id",adminAuth,uploadFile,editLecture)
export default router;
