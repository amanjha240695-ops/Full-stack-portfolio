import prisma from "../config/prisma.js";

// ==============================
// Submit Contact Form
// POST /api/contact
// ==============================
export const submitContact = async (req, res) => {
  try {
    const { name, workType, email, phone, message } = req.body;

    // Validation
    if (!name || !workType || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        workType,
        email,
        phone,
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Submit Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};