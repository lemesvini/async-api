"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = authenticateUser;
async function authenticateUser(request, reply) {
    try {
        const token = request.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return reply.status(401).send({
                error: "Unauthorized",
                message: "No token provided",
            });
        }
        const decoded = await request.jwtVerify();
        // The decoded user is automatically attached to request.user by jwtVerify
    }
    catch (err) {
        return reply.status(401).send({
            error: "Unauthorized",
            message: "Invalid token",
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map