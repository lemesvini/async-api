"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentHandler = createPaymentHandler;
exports.getPaymentHandler = getPaymentHandler;
exports.getPaymentsHandler = getPaymentsHandler;
exports.updatePaymentHandler = updatePaymentHandler;
exports.deletePaymentHandler = deletePaymentHandler;
exports.markPaymentAsPaidHandler = markPaymentAsPaidHandler;
exports.getPaymentStatsHandler = getPaymentStatsHandler;
exports.createBulkPaymentsHandler = createBulkPaymentsHandler;
exports.getStudentPaymentsHandler = getStudentPaymentsHandler;
const payment_service_1 = require("./payment.service");
async function createPaymentHandler(request, reply) {
    const body = request.body;
    try {
        const payment = await (0, payment_service_1.createPayment)(body);
        reply.code(201).send(payment);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2002") {
            return reply
                .status(400)
                .send({ error: "Payment already exists for this period" });
        }
        if (error?.code === "P2003") {
            return reply.status(400).send({ error: "Student or class not found" });
        }
        reply.status(500).send({ error: "Failed to create payment" });
    }
}
async function getPaymentHandler(request, reply) {
    const params = request.params;
    try {
        const payment = await (0, payment_service_1.getPaymentById)(params);
        if (!payment) {
            return reply.status(404).send({ error: "Payment not found" });
        }
        reply.send(payment);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get payment" });
    }
}
async function getPaymentsHandler(request, reply) {
    const query = request.query;
    try {
        const result = await (0, payment_service_1.getPayments)(query || {});
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get payments" });
    }
}
async function updatePaymentHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const payment = await (0, payment_service_1.updatePayment)(params, body);
        reply.send(payment);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Payment not found" });
        }
        reply.status(500).send({ error: "Failed to update payment" });
    }
}
async function deletePaymentHandler(request, reply) {
    const params = request.params;
    try {
        const result = await (0, payment_service_1.deletePayment)(params);
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Payment not found" });
        }
        reply.status(500).send({ error: "Failed to delete payment" });
    }
}
async function markPaymentAsPaidHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const payment = await (0, payment_service_1.markPaymentAsPaid)(params, body);
        reply.send(payment);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Payment not found" });
        }
        reply.status(500).send({ error: "Failed to mark payment as paid" });
    }
}
async function getPaymentStatsHandler(request, reply) {
    try {
        const stats = await (0, payment_service_1.getPaymentStats)();
        reply.send(stats);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get payment statistics" });
    }
}
async function createBulkPaymentsHandler(request, reply) {
    const body = request.body;
    try {
        const result = await (0, payment_service_1.createBulkPaymentsForClass)(body);
        reply.code(201).send(result);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2003") {
            return reply.status(400).send({ error: "Class not found" });
        }
        if (error?.message === "No active students found in this class") {
            return reply.status(400).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to create bulk payments" });
    }
}
async function getStudentPaymentsHandler(request, reply) {
    const { studentId } = request.params;
    const query = request.query;
    try {
        const result = await (0, payment_service_1.getStudentPayments)(studentId, query || {});
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get student payments" });
    }
}
//# sourceMappingURL=payment.controller.js.map