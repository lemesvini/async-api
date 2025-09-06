const { PrismaClient } = require("./src/generated/prisma");
const { hashPassword } = require("./src/utils/hash");

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "viniciuslemesds@gmail.com" },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser.email);
      return;
    }

    // Create password hash
    const { hash, salt } = hashPassword("123456");

    // Create test user
    const user = await prisma.user.create({
      data: {
        email: "viniciuslemesds@gmail.com",
        password: hash,
        salt: salt,
        fullName: "Vinicius Lemes",
        role: "ADMIN",
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    console.log("Test user created successfully:", user);
  } catch (error) {
    console.error("Error creating test user:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
