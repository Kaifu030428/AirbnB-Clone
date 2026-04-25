const jwt = require("jsonwebtoken");

// JWT Token Verify karne ka Middleware
const requireSignIn = async (req, res, next) => {
    try {
        // 1. Cookies me se token nikalna
        const token = req.cookies.token;

        // 2. Agar token nahi hai toh error
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized Access. Please login first." 
            });
        }

        // 3. Token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Decoded user ID ko request object me daalna taaki aage use ho sake
        req.user = decoded; 

        // 5. Sab theek hai toh aage badho
        next();

    } catch (error) {
        console.log("Error in auth middleware:", error);
        return res.status(401).json({ 
            success: false, 
            message: "Invalid or Expired Token. Please login again." 
        });
    }
};

module.exports = { requireSignIn };