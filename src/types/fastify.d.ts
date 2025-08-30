import { FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: any) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id?: string;
      email?: string;
      fullName?: string;
      role?: string;
      userId?: string;
      [key: string]: any;
    };
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
    };
  }
}
