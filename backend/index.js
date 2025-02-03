import express from "express"
import 'dotenv/config'
import { ConnectionDb } from "./db/db.js"



const app=express()
app.use(express.json())
const port=process.env.PORT
//importing routes
import userRouter from "./routes/userRoutes.js"
import courseRouter from "./routes/courseRouter.js"
//using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",courseRouter)
app.use("/api/v1/course",courseRouter)
console.log(port)
app.listen(port,()=>
    {
        console.log(`SERVER RUNIING AT http://localhost:${port}`)
        ConnectionDb()
    })