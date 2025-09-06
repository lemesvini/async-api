import { FastifyReply, FastifyRequest } from "fastify";
import {
  createPayment,
  getPaymentById,
  getPayments,
  updatePayment,
  deletePayment,
  markPaymentAsPaid,
  getPaymentStats,
  createBulkPaymentsForClass,
  getStudentPayments,
} from "./payment.service";
import {
  CreatePaymentInput,
  UpdatePaymentInput,
  GetPaymentParams,
  GetPaymentsQuery,
  MarkPaymentPaidInput,
  BulkCreatePaymentsInput,
} from "./payment.schema";

export async function createPaymentHandler(
  request: FastifyRequest<{
    Body: CreatePaymentInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const payment = await createPayment(body);
    reply.code(201).send(payment);
  } catch (error: any) {
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

export async function getPaymentHandler(
  request: FastifyRequest<{
    Params: GetPaymentParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const payment = await getPaymentById(params);
    if (!payment) {
      return reply.status(404).send({ error: "Payment not found" });
    }
    reply.send(payment);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get payment" });
  }
}

export async function getPaymentsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query as GetPaymentsQuery;
  try {
    const result = await getPayments(query || {});
    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get payments" });
  }
}

export async function updatePaymentHandler(
  request: FastifyRequest<{
    Params: GetPaymentParams;
    Body: UpdatePaymentInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const payment = await updatePayment(params, body);
    reply.send(payment);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Payment not found" });
    }
    reply.status(500).send({ error: "Failed to update payment" });
  }
}

export async function deletePaymentHandler(
  request: FastifyRequest<{
    Params: GetPaymentParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const result = await deletePayment(params);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Payment not found" });
    }
    reply.status(500).send({ error: "Failed to delete payment" });
  }
}

export async function markPaymentAsPaidHandler(
  request: FastifyRequest<{
    Params: GetPaymentParams;
    Body: MarkPaymentPaidInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const payment = await markPaymentAsPaid(params, body);
    reply.send(payment);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Payment not found" });
    }
    reply.status(500).send({ error: "Failed to mark payment as paid" });
  }
}

export async function getPaymentStatsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const stats = await getPaymentStats();
    reply.send(stats);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get payment statistics" });
  }
}

export async function createBulkPaymentsHandler(
  request: FastifyRequest<{
    Body: BulkCreatePaymentsInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const result = await createBulkPaymentsForClass(body);
    reply.code(201).send(result);
  } catch (error: any) {
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

export async function getStudentPaymentsHandler(
  request: FastifyRequest<{
    Params: { studentId: string };
    Querystring: GetPaymentsQuery;
  }>,
  reply: FastifyReply
) {
  const { studentId } = request.params;
  const query = request.query;
  try {
    const result = await getStudentPayments(studentId, query || {});
    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get student payments" });
  }
}
