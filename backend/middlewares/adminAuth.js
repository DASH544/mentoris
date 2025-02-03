import jwt from "jsonwebtoken";
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "Unauthuorized" });
    }
 
    const adminData = jwt.verify(token, process.env.JWT_SECRET);
  
    if (adminData && adminData.userRole == "admin") {
      req.admin = adminData.userId;
      next();
    } else {
      res.status(403).json({
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(500).json({ messgage: error.messgage });
  }
};
