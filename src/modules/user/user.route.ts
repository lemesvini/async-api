import { FastifyInstance } from "fastify";
import {
  registerUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
  deleteUserHandler,
} from "./user.controller";
import {
  createUserSchema,
  updateUserSchema,
  getUserParamsSchema,
} from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  // Create user (POST /)
  server.post(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = createUserSchema.parse(request.body);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    registerUserHandler
  );

  // Get all users (GET /)
  server.get("/", getUsersHandler);

  // Get user by ID (GET /:id)
  server.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getUserParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getUserHandler
  );

  // Update user (PUT /:id)
  server.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getUserParamsSchema.parse(request.params);
          request.body = updateUserSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    updateUserHandler
  );

  // Delete user (DELETE /:id)
  server.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getUserParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    deleteUserHandler
  );
}

export default userRoutes;
