"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_controller_1 = require("./payment.controller");
const payment_schema_1 = require("./payment.schema");
async function paymentRoutes(server) {
    // Get payment statistics (GET /stats)
    server.get("/stats", payment_controller_1.getPaymentStatsHandler);
    // Create payment (POST /)
    server.post("/", {
        preHandler: async (request, reply) => {
            try {
                request.body = payment_schema_1.createPaymentSchema.parse(request.body);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, payment_controller_1.createPaymentHandler);
    // Create bulk payments for a class (POST /bulk)
    server.post("/bulk", {
        preHandler: async (request, reply) => {
            try {
                request.body = payment_schema_1.bulkCreatePaymentsSchema.parse(request.body);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid request body", details: error });
            }
        },
    }, payment_controller_1.createBulkPaymentsHandler);
    // Get all payments (GET /)
    server.get("/", payment_controller_1.getPaymentsHandler);
    // Get payments for a specific student (GET /student/:studentId)
    server.get("/student/:studentId", payment_controller_1.getStudentPaymentsHandler);
    // Get payment by ID (GET /:id)
    server.get("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = payment_schema_1.getPaymentParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, payment_controller_1.getPaymentHandler);
    // Update payment (PUT /:id)
    server.put("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = payment_schema_1.getPaymentParamsSchema.parse(request.params);
                request.body = payment_schema_1.updatePaymentSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, payment_controller_1.updatePaymentHandler);
    // Mark payment as paid (PATCH /:id/pay)
    server.patch("/:id/pay", {
        preHandler: async (request, reply) => {
            try {
                request.params = payment_schema_1.getPaymentParamsSchema.parse(request.params);
                request.body = payment_schema_1.markPaymentPaidSchema.parse(request.body);
            }
            catch (error) {
                reply.status(400).send({ error: "Invalid request", details: error });
            }
        },
    }, payment_controller_1.markPaymentAsPaidHandler);
    // Delete payment (DELETE /:id)
    server.delete("/:id", {
        preHandler: async (request, reply) => {
            try {
                request.params = payment_schema_1.getPaymentParamsSchema.parse(request.params);
            }
            catch (error) {
                reply
                    .status(400)
                    .send({ error: "Invalid parameters", details: error });
            }
        },
    }, payment_controller_1.deletePaymentHandler);
}
exports.default = paymentRoutes;
//# sourceMappingURL=payment.route.js.map