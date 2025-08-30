import prisma from "../../utils/prisma";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { LoginInput, RegisterInput, ChangePasswordInput } from "./auth.schema";
import { FastifyInstance } from "fastify";

interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export async function loginUser(
  input: LoginInput,
  app: FastifyInstance
): Promise<{
  user: AuthenticatedUser;
  accessToken: string;
  refreshToken: string;
} | null> {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      password: true,
      salt: true,
    },
  });

  if (!user) {
    return null;
  }

  // Verify password
  const isValidPassword = verifyPassword(
    input.password,
    user.salt,
    user.password
  );
  if (!isValidPassword) {
    return null;
  }

  // Create user payload (without sensitive data)
  const userPayload: AuthenticatedUser = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };

  // Generate tokens using the JWT instance
  const accessToken = app.jwt.sign(userPayload, { expiresIn: "15m" });
  const refreshToken = app.jwt.sign({ userId: user.id }, { expiresIn: "7d" });

  return {
    user: userPayload,
    accessToken,
    refreshToken,
  };
}

export async function registerUser(
  input: RegisterInput
): Promise<AuthenticatedUser> {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const { password, birthDate, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
      salt,
      birthDate: birthDate ? new Date(birthDate) : null,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
    },
  });

  return user;
}

export async function refreshUserToken(
  refreshToken: string,
  app: FastifyInstance
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    // Verify refresh token
    const decoded = app.jwt.verify(refreshToken) as { userId: string };

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    // Generate new tokens
    const userPayload: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    const newAccessToken = app.jwt.sign(userPayload, { expiresIn: "15m" });
    const newRefreshToken = app.jwt.sign(
      { userId: user.id },
      { expiresIn: "7d" }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    return null;
  }
}

export async function changeUserPassword(
  userId: string,
  input: ChangePasswordInput
): Promise<boolean> {
  // Get current user
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true, salt: true },
  });

  if (!user) {
    return false;
  }

  // Verify current password
  const isCurrentPasswordValid = verifyPassword(
    input.currentPassword,
    user.salt,
    user.password
  );

  if (!isCurrentPasswordValid) {
    return false;
  }

  // Hash new password
  const { hash, salt } = hashPassword(input.newPassword);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hash,
      salt,
    },
  });

  return true;
}

export async function getUserFromToken(
  token: string,
  app: FastifyInstance
): Promise<AuthenticatedUser | null> {
  try {
    const decoded = app.jwt.verify(token) as AuthenticatedUser;

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
