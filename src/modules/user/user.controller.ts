import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "./user.service";
import {
  CreateUserInput,
  UpdateUserInput,
  GetUserParams,
  GetUsersQuery,
} from "./user.schema";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const user = await createUser(body);
    reply.code(201).send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to create user" });
  }
}

export async function getUserHandler(
  request: FastifyRequest<{
    Params: GetUserParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const user = await getUserById(params);
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }
    reply.send(user);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get user" });
  }
}

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query as any;
  try {
    const result = await getUsers(query || {});
    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get users" });
  }
}

export async function updateUserHandler(
  request: FastifyRequest<{
    Params: GetUserParams;
    Body: UpdateUserInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const user = await updateUser(params, body);
    reply.send(user);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "User not found" });
    }
    reply.status(500).send({ error: "Failed to update user" });
  }
}

export async function deleteUserHandler(
  request: FastifyRequest<{
    Params: GetUserParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const result = await deleteUser(params);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "User not found" });
    }
    reply.status(500).send({ error: "Failed to delete user" });
  }
}
