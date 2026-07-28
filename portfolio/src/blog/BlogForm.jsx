import { useState } from "react";
import api from "../services/api";
import "./BlogForm.css";


function BlogForm({ blog, onClose, onSaved }) {


  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({

    title: blog?.title || "",

    slug: blog?.slug || "",

    coverImage: blog?.coverImage || "",

    images: blog?.images || [],

    content: blog?.content || "",

    published: blog?.published || false,

  });





  const generateSlug = (title) => {

    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  };





  const handleTitleChange = (e) => {

    const title = e.target.value;


    setFormData({

      ...formData,

      title,

      slug: generateSlug(title),

    });

  };





  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData({

      ...formData,

      [name]: value,

    });

  };







  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      setLoading(true);



      if (blog) {


        await api.put(

          `/admin/blogs/${blog.id}`,

          formData

        );


        alert("Blog updated successfully");



      } else {


        await api.post(

          "/admin/blogs",

          formData

        );


        alert("Blog created successfully");


      }



      onSaved();



    } catch (error) {


      console.error(

        "Blog save error:",

        error

      );



      alert(

        error.response?.data?.message ||

        "Failed to save blog"

      );



    } finally {


      setLoading(false);


    }

  };







  return (

    <div className="blog-form-container">


      <div className="blog-form-header">


        <h2>

          {blog ? "Edit Blog" : "Create New Blog"}

        </h2>



        <button

          type="button"

          onClick={onClose}

        >

          Back

        </button>


      </div>







      <form onSubmit={handleSubmit}>


        <label>
          Title
        </label>


        <input

          type="text"

          value={formData.title}

          onChange={handleTitleChange}

          placeholder="Enter blog title"

          required

        />







        <label>
          Slug
        </label>


        <input

          type="text"

          value={formData.slug}

          readOnly

        />







        <label>
          Cover Image URL
        </label>


        <input

          type="text"

          name="coverImage"

          value={formData.coverImage}

          onChange={handleChange}

          placeholder="Cloudinary image URL"

        />







        <label>
          Additional Images URLs
        </label>


        <input

          type="text"

          value={formData.images.join(", ")}

          placeholder="Separate image URLs with comma"

          onChange={(e)=>{


            setFormData({

              ...formData,

              images:e.target.value

                .split(",")

                .map((item)=>item.trim())

                .filter(Boolean),

            });


          }}

        />







        <label>
          Content
        </label>


        <textarea

          name="content"

          rows="15"

          value={formData.content}

          onChange={handleChange}

          placeholder="Write your blog..."

          required

        />







        <div className="publish-box">


          <label>


            <input

              type="checkbox"

              checked={formData.published}

              onChange={(e)=>


                setFormData({

                  ...formData,

                  published:e.target.checked,

                })


              }

            />


            Publish now


          </label>


        </div>







        <button

          className="save-blog-btn"

          type="submit"

          disabled={loading}

        >

          {

            loading

            ? "Saving..."

            : "Save Blog"

          }


        </button>



      </form>



    </div>

  );

}


export default BlogForm;