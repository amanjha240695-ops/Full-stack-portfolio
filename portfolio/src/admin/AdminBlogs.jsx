import { useState } from "react";
import BlogTable from "../blog/BlogTable";
import BlogForm from "../blog/BlogForm";
import "./AdminBlogs.css";


function AdminBlogs() {

  const [showForm, setShowForm] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const [refresh, setRefresh] = useState(false);



  const handleCreate = () => {

    setSelectedBlog(null);

    setShowForm(true);

  };



  const handleEdit = (blog) => {

    setSelectedBlog(blog);

    setShowForm(true);

  };



  const handleCloseForm = () => {

    setSelectedBlog(null);

    setShowForm(false);

  };



  const handleBlogSaved = () => {

    setRefresh((prev) => !prev);

    setSelectedBlog(null);

    setShowForm(false);

  };



  return (

    <div className="admin-blogs">


      <div className="admin-blogs-header">


        <div>

          <h1>
            Blogs
          </h1>


          <p>
            Create, manage and publish your portfolio blogs.
          </p>

        </div>



        {!showForm && (

          <button

            className="create-blog-btn"

            onClick={handleCreate}

          >

            + New Blog

          </button>

        )}


      </div>





      {
        showForm ? (

          <BlogForm

            blog={selectedBlog}

            onClose={handleCloseForm}

            onSaved={handleBlogSaved}

          />


        ) : (


          <BlogTable

            key={refresh}

            onEdit={handleEdit}

            onRefresh={handleBlogSaved}

          />


        )
      }



    </div>

  );

}


export default AdminBlogs;