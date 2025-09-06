import { FastifyInstance } from "fastify";
import {
  createLessonHandler,
  getLessonHandler,
  getClassLessonsHandler,
  updateLessonHandler,
  deleteLessonHandler,
} from "./lesson.controller";
import {
  createLessonSchema,
  updateLessonSchema,
  getLessonParamsSchema,
  getClassLessonsParamsSchema,
} from "./lesson.schema";

async function lessonRoutes(server: FastifyInstance) {
  // Create lesson (POST /)
  server.post(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = createLessonSchema.parse(request.body);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    createLessonHandler
  );

  // Get lesson by ID (GET /:id)
  server.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getLessonParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getLessonHandler
  );

  // Update lesson (PUT /:id)
  server.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getLessonParamsSchema.parse(request.params);
          request.body = updateLessonSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    updateLessonHandler
  );

  // Delete lesson (DELETE /:id)
  server.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getLessonParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    deleteLessonHandler
  );

  // Get lessons for a class (GET /class/:classId)
  server.get(
    "/class/:classId",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getClassLessonsParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getClassLessonsHandler
  );
}

export default lessonRoutes;
