import { useEffect, useState } from "react";
import api from "../services/api";
import "./BlogTable.css";


function BlogTable({ onEdit, onRefresh }) {


  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);




  const fetchBlogs = async () => {

    try {

      const response = await api.get("/admin/blogs");


      setBlogs(
        response.data.blogs || []
      );


    } catch (error) {

      console.error(
        "Failed to fetch blogs",
        error
      );


    } finally {

      setLoading(false);

    }

  };





  useEffect(() => {

    fetchBlogs();

  }, []);






  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );


    if (!confirmDelete) return;



    try {


      await api.delete(
        `/admin/blogs/${id}`
      );


      alert(
        "Blog deleted successfully"
      );


      onRefresh();



    } catch (error) {


      console.error(
        "Delete error:",
        error
      );


      alert(
        "Failed to delete blog"
      );

    }

  };







  const handlePublish = async (blog) => {


    try {


      const url = blog.published

        ? `/admin/blogs/${blog.id}/unpublish`

        : `/admin/blogs/${blog.id}/publish`;




      await api.patch(url);



      alert(

        blog.published

        ? "Blog unpublished"

        : "Blog published"

      );



      onRefresh();




    } catch (error) {


      console.error(
        "Publish error:",
        error
      );


      alert(
        "Action failed"
      );

    }

  };







  if (loading) {


    return (

      <div className="empty-blog">

        Loading blogs...

      </div>

    );

  }







  return (


    <div className="blog-table-container">



      <div className="blog-search">

        <input

          type="text"

          placeholder="Search blogs..."

        />

      </div>







      <div className="blog-table">



        <div className="blog-table-header">


          <span>
            Cover
          </span>


          <span>
            Title
          </span>


          <span>
            Status
          </span>


          <span>
            Date
          </span>


          <span>
            Actions
          </span>


        </div>







        {
          blogs.length === 0 ? (


            <div className="empty-blog">

              No blogs found.

            </div>



          ) : (


            blogs.map((blog) => (


              <div

                className="blog-row"

                key={blog.id}

              >




                <img

                  src={
                    blog.coverImage ||
                    "/default-blog.png"
                  }

                  alt={blog.title}

                />





                <span>

                  {blog.title}

                </span>





                <span>


                  {
                    blog.published

                    ? "Published"

                    : "Draft"
                  }


                </span>





                <span>


                  {
                    new Date(
                      blog.createdAt
                    ).toLocaleDateString()
                  }


                </span>







                <div className="blog-actions">



                  <button

                    onClick={() =>
                      onEdit(blog)
                    }

                  >

                    Edit

                  </button>





                  <button

                    onClick={() =>
                      handleDelete(blog.id)
                    }

                  >

                    Delete

                  </button>





                  <button

                    onClick={() =>
                      handlePublish(blog)
                    }

                  >

                    {
                      blog.published

                      ? "Unpublish"

                      : "Publish"
                    }


                  </button>




                </div>




              </div>


            ))

          )

        }



      </div>



    </div>


  );

}


export default BlogTable;