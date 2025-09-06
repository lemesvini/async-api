"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = loginHandler;
exports.registerHandler = registerHandler;
exports.refreshTokenHandler = refreshTokenHandler;
exports.logoutHandler = logoutHandler;
exports.changePasswordHandler = changePasswordHandler;
exports.getMeHandler = getMeHandler;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
async function loginHandler(request, reply) {
    try {
        const body = auth_schema_1.loginSchema.parse(request.body);
        const result = await (0, auth_service_1.loginUser)(body, request.server);
        if (!result) {
            return reply.status(401).send({
                error: "Invalid credentials",
                message: "Email or password is incorrect",
            });
        }
        // Set refresh token as httpOnly cookie
        reply.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return reply.send({
            message: "Login successful",
            user: result.user,
            accessToken: result.accessToken,
        });
    }
    catch (error) {
        request.log.error(error);
        return reply.status(400).send({
            error: "Bad Request",
            message: "Invalid input data",
        });
    }
}
async function registerHandler(request, reply) {
    try {
        const body = auth_schema_1.registerSchema.parse(request.body);
        const user = await (0, auth_service_1.registerUser)(body);
        return reply.status(201).send({
            message: "User registered successfully",
            user,
        });
    }
    catch (error) {
        request.log.error(error);
        if (error.message === "User with this email already exists") {
            return reply.status(409).send({
                error: "Conflict",
                message: error.message,
            });
        }
        return reply.status(400).send({
            error: "Bad Request",
            message: "Invalid input data",
        });
    }
}
async function refreshTokenHandler(request, reply) {
    try {
        // Get refresh token from cookie or body
        const refreshToken = request.cookies.refreshToken || request.body?.refreshToken;
        if (!refreshToken) {
            return reply.status(401).send({
                error: "Unauthorized",
                message: "Refresh token is required",
            });
        }
        const result = await (0, auth_service_1.refreshUserToken)(refreshToken, request.server);
        if (!result) {
            return reply.status(401).send({
                error: "Unauthorized",
                message: "Invalid or expired refresh token",
            });
        }
        // Set new refresh token as httpOnly cookie
        reply.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return reply.send({
            message: "Token refreshed successfully",
            accessToken: result.accessToken,
        });
    }
    catch (error) {
        request.log.error(error);
        return reply.status(401).send({
            error: "Unauthorized",
            message: "Invalid or expired refresh token",
        });
    }
}
async function logoutHandler(request, reply) {
    // Clear the refresh token cookie
    reply.clearCookie("refreshToken");
    return reply.send({
        message: "Logout successful",
    });
}
async function changePasswordHandler(request, reply) {
    try {
        const body = auth_schema_1.changePasswordSchema.parse(request.body);
        // Get user ID from JWT token
        const user = request.user;
        if (!user?.id) {
            return reply.status(401).send({
                error: "Unauthorized",
                message: "Authentication required",
            });
        }
        const success = await (0, auth_service_1.changeUserPassword)(user.id, body);
        if (!success) {
            return reply.status(400).send({
                error: "Bad Request",
                message: "Current password is incorrect",
            });
        }
        return reply.send({
            message: "Password changed successfully",
        });
    }
    catch (error) {
        request.log.error(error);
        return reply.status(400).send({
            error: "Bad Request",
            message: "Invalid input data",
        });
    }
}
async function getMeHandler(request, reply) {
    const user = request.user;
    if (!user) {
        return reply.status(401).send({
            error: "Unauthorized",
            message: "Authentication required",
        });
    }
    return reply.send({
        user,
    });
}
//# sourceMappingURL=auth.controller.js.map