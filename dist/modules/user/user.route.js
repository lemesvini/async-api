"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./user.schema");
async function userRoutes(server) {
    // Create user (POST /)
    server.post("/", {
        preHandler: async (request, reply) => {
            try {
                request.body = user_schema_1.createUserSchema.parse(request.body);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, user_controller_1.registerUserHandler);
    // Get all users (GET /)
    server.get("/", user_controller_1.getUsersHandler);
    // Get user by ID (GET /:id)
    server.get("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = user_schema_1.getUserParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, user_controller_1.getUserHandler);
    // Update user (PUT /:id)
    server.put("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = user_schema_1.getUserParamsSchema.parse(request.params);
                request.body = user_schema_1.updateUserSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, user_controller_1.updateUserHandler);
    // Delete user (DELETE /:id)
    server.delete("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = user_schema_1.getUserParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, user_controller_1.deleteUserHandler);
}
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map