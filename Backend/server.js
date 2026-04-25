require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.options('/{*any}', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
