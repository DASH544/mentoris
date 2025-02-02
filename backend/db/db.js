import mongoose from "mongoose"

export const ConnectionDb=async()=>
    {
        try {
            await mongoose.connect(process.env.MONGO_URL,
                {
                    dbName:"mentoris"
                })
        } catch (error) {
            console.log(error)
        }
    }