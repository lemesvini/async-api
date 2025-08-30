import { FastifyRequest, FastifyReply } from "fastify";

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return reply.status(401).send({
        error: "Unauthorized",
        message: "No token provided",
      });
    }

    const decoded = await request.jwtVerify();
    // The decoded user is automatically attached to request.user by jwtVerify
  } catch (err) {
    return reply.status(401).send({
      error: "Unauthorized",
      message: "Invalid token",
    });
  }
}
