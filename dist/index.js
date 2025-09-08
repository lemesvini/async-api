"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const class_route_1 = __importDefault(require("./modules/class/class.route"));
const contents_route_1 = __importDefault(require("./modules/contents/contents.route"));
const lesson_route_1 = __importDefault(require("./modules/lesson/lesson.route"));
const dashboard_route_1 = __importDefault(require("./modules/dashboard/dashboard.route"));
const payment_route_1 = __importDefault(require("./modules/payment/payment.route"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const app = (0, fastify_1.default)({
    logger: true,
});
// Add global hook to handle CORS manually
app.addHook("onRequest", async (request, reply) => {
    const origin = request.headers.origin;
    // List of allowed origins
    const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://async-app-omega.vercel.app"
    ];
    // Check if origin is allowed or matches Vercel pattern
    if (origin && (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin))) {
        reply.header("Access-Control-Allow-Origin", origin);
    }
    else if (!origin) {
        // Allow requests with no origin (Postman, mobile apps, etc.)
        reply.header("Access-Control-Allow-Origin", "*");
    }
    reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    reply.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
    reply.header("Access-Control-Allow-Credentials", "true");
});
// Handle preflight OPTIONS requests
app.addHook("onRequest", async (request, reply) => {
    if (request.method === "OPTIONS") {
        reply.status(200).send();
        return;
    }
});
// Register plugins
app.register(jwt_1.default, {
    secret: process.env.JWT_SECRET || "supersecretkey-change-in-production",
});
app.register(cookie_1.default, {
    secret: process.env.COOKIE_SECRET || "supersecretkey-change-in-production",
    parseOptions: {},
});
// Add authentication decorator
app.decorate("authenticate", auth_middleware_1.authenticateUser);
app.get("/healthCheck", async () => {
    return { status: "ok" };
});
app.get("/test", async () => {
    return {
        message: "test",
        timestamp: new Date().toISOString(),
        data: { test: true },
    };
});
const start = async () => {
    app.register(auth_route_1.default, { prefix: "/api/auth" });
    app.register(user_route_1.default, { prefix: "/api/users" });
    app.register(class_route_1.default, { prefix: "/api/classes" });
    app.register(contents_route_1.default, { prefix: "/api/contents" });
    app.register(lesson_route_1.default, { prefix: "/api/lessons" });
    app.register(dashboard_route_1.default, { prefix: "/api/dashboard" });
    app.register(payment_route_1.default, { prefix: "/api/payments" });
    try {
        const port = parseInt(process.env.PORT || "3000", 10);
        const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
        await app.listen({ port, host: "0.0.0.0" });
        console.log(`🚀 Server is running on http://${host}:${port}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
exports.default = app;
//# sourceMappingURL=index.js.map