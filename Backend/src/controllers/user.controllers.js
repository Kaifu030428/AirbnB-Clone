const userModel = require("../models/user.models");

const registerController = async (req, res) => {
    try {
        let { name, email, phone, password, role } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Default role is guest if not specified
        const userRole = role === 'admin' ? 'admin' : 'guest';

        // Hashing ab Model apne aap kar lega `pre('save')` hook se!
        let newUser = await userModel.create({
            name, email, phone, password, role: userRole
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role
            }
        });

    } catch (error) {
        console.log("Error in register controller:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        // Tumhare banaye hue Model Method ka use!
        const isMatch = await user.comparePass(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Tumhare banaye hue Model Method ka use!
        const token = user.generateToken();
      
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
        
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutController = async (req, res) => {
   try {
    let token = req.cookies.token;
    if(!token) return res.status(404).json({ message: "Token not found" });

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({ success: true, message: "User logged out successfully" });
    
   } catch (error) {
    console.log("Error in logout controller:", error);
    res.status(500).json({ message: "Internal server error" });
   }
}

const toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.params;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const isWishlisted = user.wishlist.includes(propertyId);
        
        if (isWishlisted) {
            user.wishlist = user.wishlist.filter(id => id.toString() !== propertyId);
        } else {
            user.wishlist.push(propertyId);
        }

        await user.save();
        
        res.status(200).json({ 
            success: true, 
            message: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
            wishlist: user.wishlist
        });
    } catch (error) {
        console.log("Error in toggleWishlist:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate('wishlist');
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        console.log("Error in getWishlist:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { registerController, loginController, logoutController, toggleWishlist, getWishlist };