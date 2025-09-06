import { FastifyInstance } from "fastify";
import {
  createPaymentHandler,
  getPaymentHandler,
  getPaymentsHandler,
  updatePaymentHandler,
  deletePaymentHandler,
  markPaymentAsPaidHandler,
  getPaymentStatsHandler,
  createBulkPaymentsHandler,
  getStudentPaymentsHandler,
} from "./payment.controller";
import {
  createPaymentSchema,
  updatePaymentSchema,
  getPaymentParamsSchema,
  markPaymentPaidSchema,
  bulkCreatePaymentsSchema,
} from "./payment.schema";

async function paymentRoutes(server: FastifyInstance) {
  // Get payment statistics (GET /stats)
  server.get("/stats", getPaymentStatsHandler);

  // Create payment (POST /)
  server.post(
    "/",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = createPaymentSchema.parse(request.body);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    createPaymentHandler
  );

  // Create bulk payments for a class (POST /bulk)
  server.post(
    "/bulk",
    {
      preHandler: async (request, reply) => {
        try {
          request.body = bulkCreatePaymentsSchema.parse(request.body);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid request body", details: error });
        }
      },
    },
    createBulkPaymentsHandler
  );

  // Get all payments (GET /)
  server.get("/", getPaymentsHandler);

  // Get payments for a specific student (GET /student/:studentId)
  server.get("/student/:studentId", getStudentPaymentsHandler);

  // Get payment by ID (GET /:id)
  server.get(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPaymentParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    getPaymentHandler
  );

  // Update payment (PUT /:id)
  server.put(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPaymentParamsSchema.parse(request.params);
          request.body = updatePaymentSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    updatePaymentHandler
  );

  // Mark payment as paid (PATCH /:id/pay)
  server.patch(
    "/:id/pay",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPaymentParamsSchema.parse(request.params);
          request.body = markPaymentPaidSchema.parse(request.body);
        } catch (error) {
          reply.status(400).send({ error: "Invalid request", details: error });
        }
      },
    },
    markPaymentAsPaidHandler
  );

  // Delete payment (DELETE /:id)
  server.delete(
    "/:id",
    {
      preHandler: async (request, reply) => {
        try {
          request.params = getPaymentParamsSchema.parse(request.params);
        } catch (error) {
          reply
            .status(400)
            .send({ error: "Invalid parameters", details: error });
        }
      },
    },
    deletePaymentHandler
  );
}

export default paymentRoutes;
