"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserHandler = registerUserHandler;
exports.getUserHandler = getUserHandler;
exports.getUsersHandler = getUsersHandler;
exports.updateUserHandler = updateUserHandler;
exports.deleteUserHandler = deleteUserHandler;
const user_service_1 = require("./user.service");
async function registerUserHandler(request, reply) {
    const body = request.body;
    try {
        const user = await (0, user_service_1.createUser)(body);
        reply.code(201).send(user);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to create user" });
    }
}
async function getUserHandler(request, reply) {
    const params = request.params;
    try {
        const user = await (0, user_service_1.getUserById)(params);
        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }
        reply.send(user);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get user" });
    }
}
async function getUsersHandler(request, reply) {
    const query = request.query;
    try {
        const result = await (0, user_service_1.getUsers)(query || {});
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get users" });
    }
}
async function updateUserHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const user = await (0, user_service_1.updateUser)(params, body);
        reply.send(user);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "User not found" });
        }
        reply.status(500).send({ error: "Failed to update user" });
    }
}
async function deleteUserHandler(request, reply) {
    const params = request.params;
    try {
        const result = await (0, user_service_1.deleteUser)(params);
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "User not found" });
        }
        reply.status(500).send({ error: "Failed to delete user" });
    }
}
//# sourceMappingURL=user.controller.js.map