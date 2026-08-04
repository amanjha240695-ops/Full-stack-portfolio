import prisma from "../config/prisma.js";
// ==============================
// Create Blog (Admin)
// ==============================
export const createBlog = async (req, res) => {
  try {
    console.log(req.body);

    const {
      title,
      slug,
      coverImage,
      images,
      content,
      published,
    } = req.body;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        coverImage,
        images,
        content,
        published,
      },
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==============================
// Get All Blogs For Admin
// ==============================
export const getAdminBlogs = async (req, res) => {

  try {

    const blogs = await prisma.blog.findMany({

      orderBy: {

        createdAt: "desc",

      },

    });


    res.status(200).json({

      success: true,

      blogs,

    });


  } catch (error) {


    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to fetch blogs",

    });


  }

};





// ==============================
// Get Blog By ID
// ==============================
export const getBlogById = async (req,res)=>{

  try{


    const {id}=req.params;


    const blog = await prisma.blog.findUnique({

      where:{
        id:id,
      },

    });



    if(!blog){

      return res.status(404).json({

        success:false,

        message:"Blog not found",

      });

    }



    res.json({

      success:true,

      blog,

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to fetch blog",

    });

  }

};






// ==============================
// Update Blog
// ==============================
export const updateBlog = async(req,res)=>{

  try{


    const {id}=req.params;


    const blog = await prisma.blog.update({

      where:{

        id:id,

      },


      data:req.body,


    });



    res.json({

      success:true,

      message:"Blog updated successfully",

      blog,

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to update blog",

    });

  }

};


// ==============================
// Delete Blog
// ==============================
export const deleteBlog = async(req,res)=>{

  try{

    const {id}=req.params;

    await prisma.blog.delete({

      where:{

        id:id,

      },

    });



    res.json({

      success:true,

      message:"Blog deleted successfully",

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to delete blog",

    });

  }

};


// ==============================
// Publish Blog
// ==============================
export const publishBlog = async(req,res)=>{

  try{


    const {id}=req.params;



    const blog = await prisma.blog.update({

      where:{

        id:id,

      },


      data:{

        published:true,

      },

    });



    res.json({

      success:true,

      message:"Blog published",

      blog,

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to publish blog",

    });

  }

};



// ==============================
// Unpublish Blog
// ==============================
export const unpublishBlog = async(req,res)=>{

  try{

    const {id}=req.params;

    const blog = await prisma.blog.update({
      
      where:{

        id:id,

      },


      data:{

        published:false,

      },

    });



    res.json({

      success:true,

      message:"Blog unpublished",

      blog,

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to unpublish blog",

    });

  }

};







// ==============================
// Public Blogs
// ==============================
export const getPublishedBlogs = async(req,res)=>{

  try{


    const blogs = await prisma.blog.findMany({

      where:{

        published:true,

      },


      orderBy:{

        createdAt:"desc",

      },

    });



    res.json({

      success:true,

      blogs,

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to fetch blogs",

    });

  }

};







// ==============================
// Public Blog Details
// ==============================
export const getBlogBySlug = async(req,res)=>{

  try{


    const {slug}=req.params;



    const blog = await prisma.blog.findUnique({

      where:{

        slug,

      },

    });



    if(!blog){

      return res.status(404).json({

        success:false,

        message:"Blog not found",

      });

    }



    res.json({

      success:true,

      blog,

    });



  }catch(error){

    console.log(error);


    res.status(500).json({

      success:false,

      message:"Failed to fetch blog",

    });

  }

};