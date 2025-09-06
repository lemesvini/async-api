import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerHandler,
  refreshTokenHandler,
  logoutHandler,
  changePasswordHandler,
  getMeHandler,
} from "./auth.controller";

async function authRoutes(fastify: FastifyInstance) {
  // Public routes
  fastify.post("/login", loginHandler);
  fastify.post("/register", registerHandler);
  fastify.post("/refresh", refreshTokenHandler);

  // Protected routes
  fastify.post(
    "/logout",
    {
      preHandler: [fastify.authenticate],
    },
    logoutHandler
  );

  // fastify.post(
  //   "/change-password",
  //   {
  //     preHandler: [fastify.authenticate],
  //   },
  //   changePasswordHandler
  // );

  fastify.get(
    "/me",
    {
      preHandler: [fastify.authenticate],
    },
    getMeHandler
  );
}

export default authRoutes;
