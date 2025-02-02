import express from "express"
import 'dotenv/config'
import { ConnectionDb } from "./db/db.js"



const app=express()
app.use(express.json())
const port=process.env.PORT
//importing routes
import userRouter from "./routes/userRoutes.js"
//using routes
app.use("/api/v1/users",userRouter)
console.log(port)
app.listen(port,()=>
    {
        console.log(`SERVER RUNIING AT http://localhost:${port}`)
        ConnectionDb()
    })