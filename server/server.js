import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// Middleware
import errorHandler from "./src/middleware/error.middleware.js";

// Routes
import auth from "./src/routes/auth.route.js";
import admin from "./src/routes/admin.route.js";

// API Routes
app.use("/api/auth", auth);
app.use("/api", admin);

// --------------------------DEPLOYMENT------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // The __dirname or __filename global variables are not available in ECMAScript module files.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "../", "client", "dist", "index.html")
    );
  });
} else {
  app.get("/api", (req, res) => {
    return res.send("<h1>Hello from Express API</h1>");
  });
}

// --------------------------DEPLOYMENT------------------------------

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
