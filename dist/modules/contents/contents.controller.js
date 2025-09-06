"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentHandler = createContentHandler;
exports.getContentHandler = getContentHandler;
exports.getContentsHandler = getContentsHandler;
exports.updateContentHandler = updateContentHandler;
exports.deleteContentHandler = deleteContentHandler;
exports.getContentsByModuleHandler = getContentsByModuleHandler;
const contents_service_1 = require("./contents.service");
async function createContentHandler(request, reply) {
    const body = request.body;
    try {
        const contentData = await (0, contents_service_1.createContent)(body);
        reply.code(201).send(contentData);
    }
    catch (error) {
        console.error(error);
        if (error.message.includes("Content with module") &&
            error.message.includes("already exists")) {
            return reply.status(409).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to create content" });
    }
}
async function getContentHandler(request, reply) {
    const params = request.params;
    try {
        const contentData = await (0, contents_service_1.getContentById)(params);
        if (!contentData) {
            return reply.status(404).send({ error: "Content not found" });
        }
        reply.send(contentData);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get content" });
    }
}
async function getContentsHandler(request, reply) {
    const query = request.query;
    try {
        const result = await (0, contents_service_1.getContents)(query || {});
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get contents" });
    }
}
async function updateContentHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const contentData = await (0, contents_service_1.updateContent)(params, body);
        reply.send(contentData);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Content not found" });
        }
        if (error.message === "Content not found") {
            return reply.status(404).send({ error: error.message });
        }
        if (error.message.includes("Content with module") &&
            error.message.includes("already exists")) {
            return reply.status(409).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to update content" });
    }
}
async function deleteContentHandler(request, reply) {
    const params = request.params;
    try {
        const result = await (0, contents_service_1.deleteContent)(params);
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Content not found" });
        }
        if (error.message ===
            "Cannot delete content with related class lessons. Please remove the lessons first.") {
            return reply.status(409).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to delete content" });
    }
}
async function getContentsByModuleHandler(request, reply) {
    const { module } = request.params;
    try {
        const contents = await (0, contents_service_1.getContentsByModule)(module);
        reply.send(contents);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get contents by module" });
    }
}
//# sourceMappingURL=contents.controller.js.map