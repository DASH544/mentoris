import express from "express"
import { userSignin, userSignup } from "../controllers/userControllers.js"
const router=express.Router()
router.post("/register",userSignup)
router.post("/signin",userSignin)
export default router