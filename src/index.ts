import "dotenv/config";
import fastify from "fastify";
import userRoutes from "./modules/user/user.route";

const app = fastify();

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
  app.register(userRoutes, { prefix: "api/users" });
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
