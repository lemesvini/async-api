"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./user.schema");
async function userRoutes(server) {
    // Create user (POST /)
    server.post("/", {
        schema: {
            body: user_schema_1.createUserSchema,
            response: { 201: user_schema_1.userResponseSchema },
        },
    }, user_controller_1.registerUserHandler);
    // Get all users (GET /)
    server.get("/", {
        schema: {
            querystring: user_schema_1.getUsersQuerySchema,
            response: { 200: user_schema_1.getUsersResponseSchema },
        },
    }, user_controller_1.getUsersHandler);
    // Get user by ID (GET /:id)
    server.get("/:id", {
        schema: {
            params: user_schema_1.getUserParamsSchema,
            response: {
                200: user_schema_1.userResponseSchema,
                404: { type: 'object', properties: { error: { type: 'string' } } }
            },
        },
    }, user_controller_1.getUserHandler);
    // Update user (PUT /:id)
    server.put("/:id", {
        schema: {
            params: user_schema_1.getUserParamsSchema,
            body: user_schema_1.updateUserSchema,
            response: {
                200: user_schema_1.userResponseSchema,
                404: { type: 'object', properties: { error: { type: 'string' } } }
            },
        },
    }, user_controller_1.updateUserHandler);
    // Delete user (DELETE /:id)
    server.delete("/:id", {
        schema: {
            params: user_schema_1.getUserParamsSchema,
            response: {
                200: user_schema_1.deleteUserResponseSchema,
                404: { type: 'object', properties: { error: { type: 'string' } } }
            },
        },
    }, user_controller_1.deleteUserHandler);
}
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map