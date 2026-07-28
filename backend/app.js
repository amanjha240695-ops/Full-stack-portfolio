import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import adminBlogRoutes from "./routes/admin.blog.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Health Check
// ==============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend API is running...",
  });
});

// ==============================
// Routes
// ==============================
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/admin/blogs", adminBlogRoutes);
app.use("/api/blogs", blogRoutes);

// ==============================
// 404 Route (Always Last)
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;