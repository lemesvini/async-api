import "dotenv/config";
import fastify from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import classRoutes from "./modules/class/class.route";
import contentsRoutes from "./modules/contents/contents.route";
import lessonRoutes from "./modules/lesson/lesson.route";
import dashboardRoutes from "./modules/dashboard/dashboard.route";
import paymentRoutes from "./modules/payment/payment.route";
import { authenticateUser } from "./middleware/auth.middleware";

const app = fastify({
  logger: true,
});

// Add global hook to handle CORS manually
app.addHook('onRequest', async (request, reply) => {
  // Set CORS headers for all requests
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  reply.header('Access-Control-Allow-Credentials', 'true');
});

// Handle preflight OPTIONS requests
app.addHook('onRequest', async (request, reply) => {
  if (request.method === 'OPTIONS') {
    reply.status(200).send();
    return;
  }
});

// Register plugins
app.register(jwt, {
  secret: process.env.JWT_SECRET || "supersecretkey-change-in-production",
});

app.register(cookie, {
  secret: process.env.COOKIE_SECRET || "supersecretkey-change-in-production",
  parseOptions: {},
});

// Add authentication decorator
app.decorate("authenticate", authenticateUser);

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
  app.register(authRoutes, { prefix: "api/auth" });
  app.register(userRoutes, { prefix: "api/users" });
  app.register(classRoutes, { prefix: "api/classes" });
  app.register(contentsRoutes, { prefix: "api/contents" });
  app.register(lessonRoutes, { prefix: "api/lessons" });
  app.register(dashboardRoutes, { prefix: "api/dashboard" });
  app.register(paymentRoutes, { prefix: "api/payments" });
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server is running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
