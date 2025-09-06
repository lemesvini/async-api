"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contents_controller_1 = require("./contents.controller");
const contents_schema_1 = require("./contents.schema");
async function contentsRoutes(server) {
    // Create content (POST /)
    server.post("/", {
        preHandler: async (request, reply) => {
            try {
                request.body = contents_schema_1.createContentSchema.parse(request.body);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, contents_controller_1.createContentHandler);
    // Get all contents (GET /)
    server.get("/", contents_controller_1.getContentsHandler);
    // Get content by ID (GET /:id)
    server.get("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = contents_schema_1.getContentParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, contents_controller_1.getContentHandler);
    // Update content (PUT /:id)
    server.put("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = contents_schema_1.getContentParamsSchema.parse(request.params);
                request.body = contents_schema_1.updateContentSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, contents_controller_1.updateContentHandler);
    // Delete content (DELETE /:id)
    server.delete("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = contents_schema_1.getContentParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, contents_controller_1.deleteContentHandler);
    // Get contents by module (GET /module/:module)
    server.get("/module/:module", {
        preHandler: async (request, reply) => {
            try {
                request.params = contents_schema_1.getContentsByModuleParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, contents_controller_1.getContentsByModuleHandler);
}
exports.default = contentsRoutes;
//# sourceMappingURL=contents.route.js.map