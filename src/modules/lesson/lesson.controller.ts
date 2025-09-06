import { FastifyRequest, FastifyReply } from "fastify";
import {
  createLesson,
  getLessonById,
  getClassLessons,
  updateLesson,
  deleteLesson,
} from "./lesson.service";
import {
  CreateLessonInput,
  UpdateLessonInput,
  GetLessonParams,
  GetClassLessonsParams,
} from "./lesson.schema";

export async function createLessonHandler(
  request: FastifyRequest<{
    Body: CreateLessonInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const lesson = await createLesson(body);
    reply.code(201).send(lesson);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Class not found or inactive") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message === "Content not found or inactive") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message.includes("already exists")) {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to create lesson" });
  }
}

export async function getLessonHandler(
  request: FastifyRequest<{
    Params: GetLessonParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const lesson = await getLessonById(params);
    reply.send(lesson);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Lesson not found") {
      return reply.status(404).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to get lesson" });
  }
}

export async function getClassLessonsHandler(
  request: FastifyRequest<{
    Params: GetClassLessonsParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const lessons = await getClassLessons(params);
    reply.send(lessons);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Class not found") {
      return reply.status(404).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to get class lessons" });
  }
}

export async function updateLessonHandler(
  request: FastifyRequest<{
    Params: GetLessonParams;
    Body: UpdateLessonInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const lesson = await updateLesson(params, body);
    reply.send(lesson);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Lesson not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message === "Content not found or inactive") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message.includes("already exists")) {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to update lesson" });
  }
}

export async function deleteLessonHandler(
  request: FastifyRequest<{
    Params: GetLessonParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const result = await deleteLesson(params);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error.message === "Lesson not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (error.message.includes("attendance records")) {
      return reply.status(400).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to delete lesson" });
  }
}
