import { FastifyReply, FastifyRequest } from "fastify";
import {
  createContent,
  getContentById,
  getContents,
  updateContent,
  deleteContent,
  getContentsByModule,
} from "./contents.service";
import {
  CreateContentInput,
  UpdateContentInput,
  GetContentParams,
  GetContentsByModuleParams,
  GetContentsQuery,
} from "./contents.schema";

export async function createContentHandler(
  request: FastifyRequest<{
    Body: CreateContentInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const contentData = await createContent(body);
    reply.code(201).send(contentData);
  } catch (error: any) {
    console.error(error);
    if (
      error.message.includes("Content with module") &&
      error.message.includes("already exists")
    ) {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to create content" });
  }
}

export async function getContentHandler(
  request: FastifyRequest<{
    Params: GetContentParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const contentData = await getContentById(params);
    if (!contentData) {
      return reply.status(404).send({ error: "Content not found" });
    }
    reply.send(contentData);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get content" });
  }
}

export async function getContentsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = request.query as any;
  try {
    const result = await getContents(query || {});
    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get contents" });
  }
}

export async function updateContentHandler(
  request: FastifyRequest<{
    Params: GetContentParams;
    Body: UpdateContentInput;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  const body = request.body;
  try {
    const contentData = await updateContent(params, body);
    reply.send(contentData);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Content not found" });
    }
    if (error.message === "Content not found") {
      return reply.status(404).send({ error: error.message });
    }
    if (
      error.message.includes("Content with module") &&
      error.message.includes("already exists")
    ) {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to update content" });
  }
}

export async function deleteContentHandler(
  request: FastifyRequest<{
    Params: GetContentParams;
  }>,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const result = await deleteContent(params);
    reply.send(result);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2025") {
      return reply.status(404).send({ error: "Content not found" });
    }
    if (
      error.message ===
      "Cannot delete content with related class lessons. Please remove the lessons first."
    ) {
      return reply.status(409).send({ error: error.message });
    }
    reply.status(500).send({ error: "Failed to delete content" });
  }
}

export async function getContentsByModuleHandler(
  request: FastifyRequest<{
    Params: GetContentsByModuleParams;
  }>,
  reply: FastifyReply
) {
  const { module } = request.params;
  try {
    const contents = await getContentsByModule(module);
    reply.send(contents);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to get contents by module" });
  }
}
