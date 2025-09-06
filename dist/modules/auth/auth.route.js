"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
async function authRoutes(fastify) {
    // Public routes
    fastify.post("/login", auth_controller_1.loginHandler);
    fastify.post("/register", auth_controller_1.registerHandler);
    fastify.post("/refresh", auth_controller_1.refreshTokenHandler);
    // Protected routes
    fastify.post("/logout", {
        preHandler: [fastify.authenticate],
    }, auth_controller_1.logoutHandler);
    // fastify.post(
    //   "/change-password",
    //   {
    //     preHandler: [fastify.authenticate],
    //   },
    //   changePasswordHandler
    // );
    fastify.get("/me", {
        preHandler: [fastify.authenticate],
    }, auth_controller_1.getMeHandler);
}
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map