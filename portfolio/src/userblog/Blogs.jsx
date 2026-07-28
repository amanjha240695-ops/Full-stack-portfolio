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


        console.log(
          "Failed to fetch blogs:",
          error
        );


      } finally {


        setLoading(false);


      }


    };


    fetchBlogs();


  }, []);





  if (loading) {

    return (

      <div className="blogs-loading">

        Loading blogs...

      </div>

    );

  }






  return (


    <section className="blogs-page">


      <div className="blogs-container">


        <h1>
          Blogs
        </h1>




        {
          blogs.length === 0 ? (

            <p className="no-blog">

              No blogs published yet.

            </p>


          ) : (


            <div className="blogs-grid">


              {
                blogs.map((blog) => (


                  <article
                    className="blog-card"
                    key={blog.id}
                  >



                    {
                      blog.image && (

                        <img
                          src={blog.image}
                          alt={blog.title}
                        />

                      )
                    }





                    <div className="blog-card-content">


                      <h2>

                        {blog.title}

                      </h2>



                      <p>

                        {
                          blog.content.length > 150

                          ? blog.content.substring(0,150) + "..."

                          : blog.content

                        }

                      </p>




                      <Link
                        to={`/blogs/${blog.slug}`}
                      >

                        Read More

                      </Link>



                    </div>



                  </article>


                ))
              }



            </div>


          )
        }




      </div>


    </section>


  );


}


export default Blogs;