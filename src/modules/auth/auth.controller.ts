import { FastifyRequest, FastifyReply } from "fastify";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  refreshTokenSchema,
  LoginInput,
  RegisterInput,
  ChangePasswordInput,
  RefreshTokenInput,
} from "./auth.schema";
import {
  loginUser,
  registerUser,
  refreshUserToken,
  changeUserPassword,
} from "./auth.service";

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  try {
    const body = loginSchema.parse(request.body);

    const result = await loginUser(body, request.server);

    if (!result) {
      return reply.status(401).send({
        error: "Invalid credentials",
        message: "Email or password is incorrect",
      });
    }

    // Set refresh token as httpOnly cookie
    reply.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return reply.send({
      message: "Login successful",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(400).send({
      error: "Bad Request",
      message: "Invalid input data",
    });
  }
}

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply
) {
  try {
    const body = registerSchema.parse(request.body);

    const user = await registerUser(body);

    return reply.status(201).send({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    request.log.error(error);

    if (error.message === "User with this email already exists") {
      return reply.status(409).send({
        error: "Conflict",
        message: error.message,
      });
    }

    return reply.status(400).send({
      error: "Bad Request",
      message: "Invalid input data",
    });
  }
}

export async function refreshTokenHandler(
  request: FastifyRequest<{ Body: RefreshTokenInput }>,
  reply: FastifyReply
) {
  try {
    // Get refresh token from cookie or body
    const refreshToken =
      request.cookies.refreshToken || request.body?.refreshToken;

    if (!refreshToken) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Refresh token is required",
      });
    }

    const result = await refreshUserToken(refreshToken, request.server);

    if (!result) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Invalid or expired refresh token",
      });
    }

    // Set new refresh token as httpOnly cookie
    reply.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return reply.send({
      message: "Token refreshed successfully",
      accessToken: result.accessToken,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Invalid or expired refresh token",
    });
  }
}

export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Clear the refresh token cookie
  reply.clearCookie("refreshToken");

  return reply.send({
    message: "Logout successful",
  });
}

export async function changePasswordHandler(
  request: FastifyRequest<{ Body: ChangePasswordInput }>,
  reply: FastifyReply
) {
  try {
    const body = changePasswordSchema.parse(request.body);

    // Get user ID from JWT token
    const user = (request as any).user;
    if (!user?.id) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "Authentication required",
      });
    }

    const success = await changeUserPassword(user.id, body);

    if (!success) {
      return reply.status(400).send({
        error: "Bad Request",
        message: "Current password is incorrect",
      });
    }

    return reply.send({
      message: "Password changed successfully",
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(400).send({
      error: "Bad Request",
      message: "Invalid input data",
    });
  }
}

export async function getMeHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = (request as any).user;

  if (!user) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }

  return reply.send({
    user,
  });
}
