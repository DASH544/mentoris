import express from "express"
import { userCourses, userSignin, userSignup } from "../controllers/userControllers.js"
import { isAuth } from "../middlewares/userAuth.js"
const router=express.Router()
router.post("/register",userSignup)
router.post("/signin",userSignin)
router.get("/purchasedcourses",isAuth,userCourses)
export default router