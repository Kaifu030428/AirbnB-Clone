require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const propertyRoutes = require("./src/routes/property.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

connectDB();

const aiRoutes = require("./src/routes/ai.routes");
app.use("/api/auth", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
