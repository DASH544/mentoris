import express from "express"
import { userCourses, userProfile, userSignin, userSignup } from "../controllers/userControllers.js"
import {  userAuth } from "../middlewares/userAuth.js"
const router=express.Router()
router.post("/register",userSignup)
router.post("/signin",userSignin)
router.get("/purchasedcourses",userAuth,userCourses)
router.get("/myprofile",userAuth,userProfile)
export default router