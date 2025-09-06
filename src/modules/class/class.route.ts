import { FastifyInstance } from "fastify";
import {
  createClassHandler,
  getClassHandler,
  getClassesHandler,
  updateClassHandler,
  deleteClassHandler,
  enrollStudentHandler,
  unenrollStudentHandler,
  getClassEnrollmentsHandler,
} from "./class.controller";
import {
  createClassSchema,
  updateClassSchema,
  getClassParamsSchema,
  enrollStudentSchema,
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

  // Enroll student in class (POST /:id/enroll)
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

  // Unenroll student from class (DELETE /:id/students/:studentId)
  server.delete(
    "/:id/students/:studentId",
    {
      preHandler: async (request, reply) => {
        try {
          const paramsSchema = getClassParamsSchema.extend({
            studentId: getClassParamsSchema.shape.id,
          });
          request.params = paramsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    unenrollStudentHandler
  );

  // Get class enrollments (GET /:id/enrollments)
  server.get(
    "/:id/enrollments",
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
    getClassEnrollmentsHandler
  );
}

export default classRoutes;
