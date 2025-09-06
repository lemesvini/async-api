import { FastifyInstance } from "fastify";
import { getDashboardStats } from "./dashboard.controller";

export default async function dashboardRoutes(app: FastifyInstance) {
  app.get("/stats", {
    preHandler: [app.authenticate],
    handler: getDashboardStats,
  });
}
