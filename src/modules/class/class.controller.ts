import { FastifyReply, FastifyRequest } from "fastify";
import {
  createClass,
  getClassById,
  getClasses,
  updateClass,
  deleteClass,
  enrollStudent,
  unenrollStudent,
} from "./class.service";
import {
  CreateClassInput,
  UpdateClassInput,
  GetClassParams,
  GetClassesQuery,
  EnrollStudentInput,
  UnenrollStudentInput,
} from "./class.schema";

export async function createClassHandler(
  request: FastifyRequest<{
    Body: CreateClassInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const classEntity = await createClass(body);
    reply.code(201).send(classEntity);
  } catch (error) {
    console.error(error);
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
    const classEntity = await getClassById(params);
    if (!classEntity) {
      return reply.status(404).send({ error: "Class not found" });
    }
    reply.send(classEntity);
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
    const classEntity = await updateClass(params, body);
    reply.send(classEntity);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Class not found" });
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
  const { id: classId } = request.params;
  const { studentId } = request.body;
  try {
    const result = await enrollStudent(classId, studentId);
    reply.code(201).send(result);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2002") {
      return reply.status(400).send({ error: "Student already enrolled" });
    }
    if (error?.code === "P2003") {
      return reply.status(404).send({ error: "Class or student not found" });
    }
    reply.status(500).send({ error: "Failed to enroll student" });
  }
}

export async function unenrollStudentHandler(
  request: FastifyRequest<{
    Params: GetClassParams;
    Body: UnenrollStudentInput;
  }>,
  reply: FastifyReply
) {
  const { id: classId } = request.params;
  const { studentId } = request.body;
  try {
    const result = await unenrollStudent(classId, studentId);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Enrollment not found" });
    }
    reply.status(500).send({ error: "Failed to unenroll student" });
  }
}
