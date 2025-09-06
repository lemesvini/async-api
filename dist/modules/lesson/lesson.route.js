"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_controller_1 = require("./lesson.controller");
const lesson_schema_1 = require("./lesson.schema");
async function lessonRoutes(server) {
    // Create lesson (POST /)
    server.post("/", {
        preHandler: async (request, reply) => {
            try {
                request.body = lesson_schema_1.createLessonSchema.parse(request.body);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, lesson_controller_1.createLessonHandler);
    // Get lesson by ID (GET /:id)
    server.get("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = lesson_schema_1.getLessonParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, lesson_controller_1.getLessonHandler);
    // Update lesson (PUT /:id)
    server.put("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = lesson_schema_1.getLessonParamsSchema.parse(request.params);
                request.body = lesson_schema_1.updateLessonSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, lesson_controller_1.updateLessonHandler);
    // Delete lesson (DELETE /:id)
    server.delete("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = lesson_schema_1.getLessonParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, lesson_controller_1.deleteLessonHandler);
    // Get lessons for a class (GET /class/:classId)
    server.get("/class/:classId", {
        preHandler: async (request, reply) => {
            try {
                request.params = lesson_schema_1.getClassLessonsParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, lesson_controller_1.getClassLessonsHandler);
}
exports.default = lessonRoutes;
//# sourceMappingURL=lesson.route.js.map