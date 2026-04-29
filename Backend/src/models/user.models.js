const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 👈 ADDED
const jwt = require('jsonwebtoken'); // 👈 ADDED

const userSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['guest', 'admin'], default: 'guest' },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]
}, {
    timestamps: true
});


// PASSWORD HASHING HOOK
userSchema.pre("save", async function() {
    // 1. Agar password change nahi hua hai, toh yahin se return kar do (bina next ke)
    if (!this.isModified("password")) {
        return; 
    }
    
    // 2. Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    
    // Yahan bhi ab koi next() likhne ki zaroorat nahi hai!
});

// COMPARE PASSWORD METHOD
userSchema.methods.comparePass = async function (password) {
  let pass = await bcrypt.compare(password, this.password);
  return pass;
};

// GENERATE TOKEN METHOD
userSchema.methods.generateToken = function () {
  let token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Mismatch tha, pehle 7d tha, schema me 1h likha. 7 days is better for Airbnb apps.
  });
  return token;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;