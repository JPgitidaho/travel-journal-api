import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import swaggerDoc from "./src/config/swagger.js";
import swaggerUi from "swagger-ui-express";
import usersRoutes from "./src/routes/users.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Travel Journal API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
