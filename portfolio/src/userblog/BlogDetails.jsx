import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../services/api";

import "./Blogs.css";

function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data.blog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <section className="blogs-loading">
        <h2>Loading Blog...</h2>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="blogs-loading">
        <div className="no-blog">
          <h2>Blog Not Found</h2>
          <p>The article you're looking for doesn't exist.</p>

          <Link to="/blogs" className="back-btn">
            ← Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  const content = blog.content || "";

  const readingTime = Math.max(
    1,
    Math.ceil(content.split(" ").filter(Boolean).length / 200)
  );

  return (
    <section className="blog-details">
      <div className="blog-details-container">
        <Link to="/blogs" className="back-btn">
          ← Back to Blogs
        </Link>

        <h1>{blog.title}</h1>

        <div className="blog-meta">
          <span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>

          <span>•</span>

          <span>{readingTime} min read</span>
        </div>

        {(blog.coverImage || blog.image) && (
          <img
            src={blog.coverImage || blog.image}
            alt={blog.title}
            className="blog-details-image"
          />
        )}

        <div className="blog-content">
          {content
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;