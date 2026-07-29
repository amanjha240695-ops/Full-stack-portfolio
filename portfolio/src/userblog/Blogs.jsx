import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="blogs-page">
        <div className="blogs-container">
          <div className="blogs-loading">
            <h2>Loading Blogs...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blogs-page">
      <div className="blogs-container">
        <div className="blogs-header">
          <h1>Latest Blogs</h1>
          <p>
            Explore articles, project updates, tutorials, and insights from my
            development journey.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="no-blog">
            <h2>No Blogs Yet</h2>
            <p>
              I haven't published any blogs yet. Check back soon for exciting
              articles and project updates.
            </p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => {
              const content = blog.content || "";
              const readingTime = Math.max(
                1,
                Math.ceil(content.split(" ").filter(Boolean).length / 200)
              );

              return (
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="blog-card"
                  key={blog.id}
                >
                  {(blog.coverImage || blog.image) && (
                    <img
                      src={blog.coverImage || blog.image}
                      alt={blog.title}
                      className="blog-cover"
                    />
                  )}

                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>

                      <span>•</span>

                      <span>{readingTime} min read</span>
                    </div>

                    <h2>{blog.title}</h2>

                    <p>
                      {content.length > 150
                        ? content.slice(0, 150) + "..."
                        : content}
                    </p>

                    <span className="read-more">
                      Read More →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blogs;