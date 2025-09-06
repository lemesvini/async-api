"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_controller_1 = require("./class.controller");
const class_schema_1 = require("./class.schema");
async function classRoutes(server) {
    // Create class (POST /)
    server.post("/", {
        preHandler: async (request, reply) => {
            try {
                request.body = class_schema_1.createClassSchema.parse(request.body);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, class_controller_1.createClassHandler);
    // Get all classes (GET /)
    server.get("/", class_controller_1.getClassesHandler);
    // Get class by ID (GET /:id)
    server.get("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = class_schema_1.getClassParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, class_controller_1.getClassHandler);
    // Update class (PUT /:id)
    server.put("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = class_schema_1.getClassParamsSchema.parse(request.params);
                request.body = class_schema_1.updateClassSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, class_controller_1.updateClassHandler);
    // Delete class (DELETE /:id)
    server.delete("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = class_schema_1.getClassParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, class_controller_1.deleteClassHandler);
    // Enroll student in class (POST /:id/enroll)
    server.post("/:id/enroll", {
        preHandler: async (request, reply) => {
            try {
                request.params = class_schema_1.getClassParamsSchema.parse(request.params);
                request.body = class_schema_1.enrollStudentSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, class_controller_1.enrollStudentHandler);
    // Unenroll student from class (DELETE /:id/students/:studentId)
    server.delete("/:id/students/:studentId", {
        preHandler: async (request, reply) => {
            try {
                const paramsSchema = class_schema_1.getClassParamsSchema.extend({
                    studentId: class_schema_1.getClassParamsSchema.shape.id,
                });
                request.params = paramsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, class_controller_1.unenrollStudentHandler);
    // Get class enrollments (GET /:id/enrollments)
    server.get("/:id/enrollments", {
        preHandler: async (request, reply) => {
            try {
                request.params = class_schema_1.getClassParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, class_controller_1.getClassEnrollmentsHandler);
}
exports.default = classRoutes;
//# sourceMappingURL=class.route.js.map