import express from "express"
import 'dotenv/config'

const app=express()
const port=process.env.PORT
console.log(port)
app.listen(port,()=>
    {
        console.log(`SERVER RUNIING AT http://localhost:${port}`)
    })