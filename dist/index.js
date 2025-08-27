"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const app = (0, fastify_1.default)();
app.get("/healthCheck", async () => {
    return { status: "ok" };
});
const start = async () => {
    app.register(user_route_1.default, { prefix: "api/users" });
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
        console.log("🚀 Server is running on http://localhost:3000");
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
exports.default = app;
//# sourceMappingURL=index.js.map