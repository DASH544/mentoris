import express from "express"
import 'dotenv/config'
import { ConnectionDb } from "./db/db.js"
import cloudinary from "cloudinary"

cloudinary.v2.config(
    {
        cloud_name:process.env.Cloudinary_Cloud_Name,
        api_key:process.env.Cloudinary_Api,
        api_secret:process.env.Cloudinary_Secret,
    })

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const port=process.env.PORT
//importing routes
import userRouter from "./routes/userRoutes.js"
import courseRouter from "./routes/courseRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
//using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",courseRouter)
console.log(port)
app.listen(port,()=>
    {
        console.log(`SERVER RUNIING AT http://localhost:${port}`)
        ConnectionDb()
    })