import jwt from "jsonwebtoken"
export const userAuth=async(req,res,next)=>
    {
        try {
            const token=req.headers.authorization
            if(!token)
                {
                return res.status(400).json({message:"Unauthuorized"})    
                }
            const userData=jwt.verify(token,process.env.JWT_SECRET)
            if(userData && userData.userRole=="user")
                {
                    req.userId=userData.userId
                    next()
                }
                else
                {
                        res.status(403).json({
                          message: "User Not Authorized",
                        });    
                }
            
        
        } catch (error) {
            res.status(500).json({messgage:error.messgage})
        }
    }