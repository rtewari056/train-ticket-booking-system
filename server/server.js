import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Middleware
import errorHandler from "./src/middleware/error.middleware.js";

// Routes
import auth from "./src/routes/auth.route.js";

// API Routes
app.get("/api", (req, res) => {
  return res.send("<h1>Hello from Express API</h1>");
});
app.use("/api/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);

// Handling server errors with clean error messages
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
