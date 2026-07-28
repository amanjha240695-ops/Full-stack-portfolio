import express from "express";

import {
  adminLogin,
  getDashboard,
  getAllMessages,
  markAsRead,
  deleteMessage,
  changePassword,
} from "../controllers/admin.controller.js";


import {
  createBlog,
  getAdminBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
} from "../controllers/blog.controller.js";


import { verifyAdmin } from "../middleware/admin.middleware.js";


const router = express.Router();



// ==============================
// Public Route
// ==============================

// POST /api/admin/login
router.post("/login", adminLogin);




// ==============================
// Protected Admin Routes
// ==============================


// Dashboard
router.get(
  "/dashboard",
  verifyAdmin,
  getDashboard
);



// Messages

router.get(
  "/messages",
  verifyAdmin,
  getAllMessages
);


router.put(
  "/messages/:id/read",
  verifyAdmin,
  markAsRead
);


router.delete(
  "/messages/:id",
  verifyAdmin,
  deleteMessage
);



// Password

router.put(
  "/change-password",
  verifyAdmin,
  changePassword
);




// ==============================
// Blog CMS Routes
// ==============================


// Get all blogs
// GET /api/admin/blogs

router.get(
  "/blogs",
  verifyAdmin,
  getAdminBlogs
);



// Create blog
// POST /api/admin/blogs

router.post(
  "/blogs",
  verifyAdmin,
  createBlog
);



// Get single blog
// GET /api/admin/blogs/:id

router.get(
  "/blogs/:id",
  verifyAdmin,
  getBlogById
);



// Update blog
// PUT /api/admin/blogs/:id

router.put(
  "/blogs/:id",
  verifyAdmin,
  updateBlog
);



// Delete blog
// DELETE /api/admin/blogs/:id

router.delete(
  "/blogs/:id",
  verifyAdmin,
  deleteBlog
);



// Publish

router.put(
  "/blogs/:id/publish",
  verifyAdmin,
  publishBlog
);



// Unpublish

router.put(
  "/blogs/:id/unpublish",
  verifyAdmin,
  unpublishBlog
);



export default router;