import { FastifyInstance } from "fastify";
import {
  createContentHandler,
  getContentHandler,
  getContentsHandler,
  updateContentHandler,
  deleteContentHandler,
  getContentsByModuleHandler,
} from "./contents.controller";
import {
  createContentSchema,
  updateContentSchema,
  getContentParamsSchema,
} from "./contents.schema";

async function contentsRoutes(server: FastifyInstance) {
  // Create content (POST /)
  server.post(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = createContentSchema.parse(request.body);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    createContentHandler
  );

  // Get all contents (GET /)
  server.get("/", getContentsHandler);

  // Get content by ID (GET /:id)
  server.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getContentParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getContentHandler
  );

  // Update content (PUT /:id)
  server.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getContentParamsSchema.parse(request.params);
          request.body = updateContentSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    updateContentHandler
  );

  // Delete content (DELETE /:id)
  server.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getContentParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    deleteContentHandler
  );

  // Get contents by module (GET /module/:module)
  server.get(
    "/module/:module",
    {
      preHandler: async (request, reply) => {
        try {
          const moduleParamsSchema = getContentParamsSchema.extend({
            module: getContentParamsSchema.shape.id,
          });
          request.params = moduleParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getContentsByModuleHandler
  );
}

export default contentsRoutes;
