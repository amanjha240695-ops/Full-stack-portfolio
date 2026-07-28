import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// ==============================
// Admin Login
// POST /api/admin/login
// ==============================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find Admin
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Dashboard
// GET /api/admin/dashboard
// ==============================
export const getDashboard = async (req, res) => {
  try {
    const totalMessages = await prisma.contact.count();

    const unreadMessages = await prisma.contact.count({
      where: {
        isRead: false,
      },
    });

    const readMessages = await prisma.contact.count({
      where: {
        isRead: true,
      },
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalMessages,
        unreadMessages,
        readMessages,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Messages
// GET /api/admin/messages
// ==============================
export const getAllMessages = async (req, res) => {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Mark Message as Read
// PUT /api/admin/messages/:id/read
// ==============================
export const markAsRead = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const message = await prisma.contact.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Message marked as read.",
      data: message,
    });
  } catch (error) {
    console.error("Mark Read Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Delete Message
// DELETE /api/admin/messages/:id
// ==============================
export const deleteMessage = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.contact.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ==============================
// Change Admin Password
// PUT /api/admin/change-password
// ==============================

export const changePassword = async (req, res) => {

  try {

    const adminId = req.admin.id;

    const {
      currentPassword,
      newPassword
    } = req.body;



    if (!currentPassword || !newPassword) {

      return res.status(400).json({
        success:false,
        message:"Current password and new password are required."
      });

    }



    const admin = await prisma.admin.findUnique({

      where:{
        id: adminId
      }

    });



    if(!admin){

      return res.status(404).json({
        success:false,
        message:"Admin not found."
      });

    }




    const isMatch =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );



    if(!isMatch){

      return res.status(401).json({
        success:false,
        message:"Current password is incorrect."
      });

    }





    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );






    await prisma.admin.update({

      where:{
        id:adminId
      },

      data:{
        password:hashedPassword
      }

    });






    return res.status(200).json({

      success:true,

      message:"Password changed successfully."

    });



  } catch(error){

    console.error(
      "Change Password Error:",
      error
    );


    return res.status(500).json({

      success:false,

      message:"Internal Server Error"

    });

  }

};