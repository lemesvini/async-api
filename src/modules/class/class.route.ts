import { FastifyInstance } from "fastify";
import {
  createClassHandler,
  getClassHandler,
  getClassesHandler,
  updateClassHandler,
  deleteClassHandler,
  enrollStudentHandler,
  unenrollStudentHandler,
} from "./class.controller";
import {
  createClassSchema,
  updateClassSchema,
  getClassParamsSchema,
  enrollStudentSchema,
  unenrollStudentSchema,
} from "./class.schema";

async function classRoutes(server: FastifyInstance) {
  // Create class (POST /)
  server.post(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = createClassSchema.parse(request.body);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    createClassHandler
  );

  // Get all classes (GET /)
  server.get("/", getClassesHandler);

  // Get class by ID (GET /:id)
  server.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getClassParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getClassHandler
  );

  // Update class (PUT /:id)
  server.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getClassParamsSchema.parse(request.params);
          request.body = updateClassSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    updateClassHandler
  );

  // Delete class (DELETE /:id)
  server.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getClassParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    deleteClassHandler
  );

  // Enroll student (POST /:id/enroll)
  server.post(
    "/:id/enroll",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getClassParamsSchema.parse(request.params);
          request.body = enrollStudentSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    enrollStudentHandler
  );

  // Unenroll student (POST /:id/unenroll)
  server.post(
    "/:id/unenroll",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getClassParamsSchema.parse(request.params);
          request.body = unenrollStudentSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    unenrollStudentHandler
  );
}

export default classRoutes;
