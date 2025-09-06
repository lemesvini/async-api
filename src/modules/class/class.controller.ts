import { FastifyReply, FastifyRequest } from "fastify";
import {
  createClass,
  getClassById,
  getClasses,
  updateClass,
  deleteClass,
  enrollStudent,
  unenrollStudent,
  getClassEnrollments,
} from "./class.service";
import {
  CreateClassInput,
  UpdateClassInput,
  GetClassParams,
  GetClassesQuery,
  EnrollStudentInput,
} from "./class.schema";

export async function createClassHandler(
  request: FastifyRequest<{
    Body: CreateClassInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const classData = await createClass(body);
    reply.code(201).send(classData);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Consultant not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (
      error.message === "User must be a consultant or admin to teach classes"
    ) {
      return reply.status(403).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to create class" });
  }
}

export async function getClassHandler(
  request: FastifyRequest<{
    Params: GetClassParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const classData = await getClassById(params);
    if (!classData) {
      return reply.status(404).send({ error: "Class not found" });
    }
    reply.send(classData);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get class" });
  }
}

export async function getClassesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query as any;
  try {
    const result = await getClasses(query || {});
    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get classes" });
  }
}

export async function updateClassHandler(
  request: FastifyRequest<{
    Params: GetClassParams;
    Body: UpdateClassInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const classData = await updateClass(params, body);
    reply.send(classData);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Class not found" });
    }
    if (error.message === "Consultant not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (
      error.message === "User must be a consultant or admin to teach classes"
    ) {
      return reply.status(403).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to update class" });
  }
}

export async function deleteClassHandler(
  request: FastifyRequest<{
    Params: GetClassParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const result = await deleteClass(params);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Class not found" });
    }
    if (
      error.message ===
      "Cannot delete class with active enrollments. Please deactivate enrollments first."
    ) {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to delete class" });
  }
}

export async function enrollStudentHandler(
  request: FastifyRequest<{
    Params: GetClassParams;
    Body: EnrollStudentInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const enrollment = await enrollStudent(params, body);
    reply.code(201).send(enrollment);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Student not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message === "Class not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message === "User must be a student to enroll in classes") {
      return reply.status(403).send({ error: error.message });
    }
    if (error.message === "Cannot enroll in inactive class") {
      return reply.status(400).send({ error: error.message });
    }
    if (error.message === "Student is already enrolled in this class") {
      return reply.status(409).send({ error: error.message });
    }
    if (error.message === "Class is full") {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to enroll student" });
  }
}

export async function unenrollStudentHandler(
  request: FastifyRequest<{
    Params: GetClassParams & { studentId: string };
  }>,
  reply: FastifyReply
) {
  const { id: classId, studentId } = request.params;
  try {
    const result = await unenrollStudent({ id: classId }, studentId);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Student is not enrolled in this class") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message === "Student enrollment is already inactive") {
      return reply.status(400).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to unenroll student" });
  }
}

export async function getClassEnrollmentsHandler(
  request: FastifyRequest<{
    Params: GetClassParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const enrollments = await getClassEnrollments(params);
    reply.send(enrollments);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get class enrollments" });
  }
}
