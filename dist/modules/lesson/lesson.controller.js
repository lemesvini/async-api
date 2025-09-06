"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLessonHandler = createLessonHandler;
exports.getLessonHandler = getLessonHandler;
exports.getClassLessonsHandler = getClassLessonsHandler;
exports.updateLessonHandler = updateLessonHandler;
exports.deleteLessonHandler = deleteLessonHandler;
const lesson_service_1 = require("./lesson.service");
async function createLessonHandler(request, reply) {
    const body = request.body;
    try {
        const lesson = await (0, lesson_service_1.createLesson)(body);
        reply.code(201).send(lesson);
    }
    catch (error) {
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
async function getLessonHandler(request, reply) {
    const params = request.params;
    try {
        const lesson = await (0, lesson_service_1.getLessonById)(params);
        reply.send(lesson);
    }
    catch (error) {
        console.error(error);
        if (error.message === "Lesson not found") {
            return reply.status(404).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to get lesson" });
    }
}
async function getClassLessonsHandler(request, reply) {
    const params = request.params;
    try {
        const lessons = await (0, lesson_service_1.getClassLessons)(params);
        reply.send(lessons);
    }
    catch (error) {
        console.error(error);
        if (error.message === "Class not found") {
            return reply.status(404).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to get class lessons" });
    }
}
async function updateLessonHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const lesson = await (0, lesson_service_1.updateLesson)(params, body);
        reply.send(lesson);
    }
    catch (error) {
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
async function deleteLessonHandler(request, reply) {
    const params = request.params;
    try {
        const result = await (0, lesson_service_1.deleteLesson)(params);
        reply.send(result);
    }
    catch (error) {
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
//# sourceMappingURL=lesson.controller.js.map