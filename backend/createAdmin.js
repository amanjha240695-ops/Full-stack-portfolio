import bcrypt from "bcryptjs";
import prisma from "./config/prisma.js";

async function createOrResetAdmin() {

  try {

    const email = "admin@portfolio.com";
    const password = "portfolioAdmin123";

    const hashedPassword = await bcrypt.hash(password, 10);


    const admin = await prisma.admin.upsert({

      where:{
        email
      },

      update:{
        password: hashedPassword
      },

      create:{
        email,
        password: hashedPassword
      }

    });


    console.log("✅ Admin ready!");
    console.log("Email:", admin.email);
    console.log("Password:", password);


  } catch(error){

    console.error(error);

  } finally {

    await prisma.$disconnect();

  }

}

createOrResetAdmin();