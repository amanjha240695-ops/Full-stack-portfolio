import express from "express";

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

router.post("/", verifyAdmin, createBlog);
router.get("/", verifyAdmin, getAdminBlogs);
router.get("/:id", verifyAdmin, getBlogById);
router.put("/:id", verifyAdmin, updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);
router.patch("/:id/publish", verifyAdmin, publishBlog);
router.patch("/:id/unpublish", verifyAdmin, unpublishBlog);

export default router;