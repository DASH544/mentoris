import express from "express";
import { addLecture, adminProfile, createCourse, deleteCourse, editCourse, getAllUsers, myCourses } from "../controllers/admin_courseControllers.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllCourse } from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";
const router = express.Router();

router.post("/createcourse", adminAuth,uploadFile, createCourse);
router.get("/mycourses",adminAuth,myCourses)
router.delete("/mycourse/delete/:id",adminAuth,deleteCourse)
router.put("/mycourse/edit/:id",adminAuth,uploadFile,editCourse)
router.get("/myusers",adminAuth,getAllUsers)
router.get("/all",getAllCourse)
router.get("/myprofile",adminAuth,adminProfile)
//lectures
router.post("/addlecture/:id",adminAuth,addLecture)
export default router;
