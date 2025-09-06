import "dotenv/config";
import fastify from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import classRoutes from "./modules/class/class.route";
import contentsRoutes from "./modules/contents/contents.route";
import lessonRoutes from "./modules/lesson/lesson.route";
import dashboardRoutes from "./modules/dashboard/dashboard.route";
import paymentRoutes from "./modules/payment/payment.route";
import { authenticateUser } from "./middleware/auth.middleware";

const app = fastify();

// Register CORS plugin
app.register(cors, {
  origin: [
    "http://localhost:5173", // Vite default port
    "http://localhost:5174", // Vite alternative port
    "http://localhost:3000", // Alternative port
    "http://localhost:4173", // Vite preview port
    "https://async-app-omega.vercel.app", // Production deployment
  ],
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
