"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassHandler = createClassHandler;
exports.getClassHandler = getClassHandler;
exports.getClassesHandler = getClassesHandler;
exports.updateClassHandler = updateClassHandler;
exports.deleteClassHandler = deleteClassHandler;
exports.enrollStudentHandler = enrollStudentHandler;
exports.unenrollStudentHandler = unenrollStudentHandler;
exports.getClassEnrollmentsHandler = getClassEnrollmentsHandler;
const class_service_1 = require("./class.service");
async function createClassHandler(request, reply) {
    const body = request.body;
    try {
        const classData = await (0, class_service_1.createClass)(body);
        reply.code(201).send(classData);
    }
    catch (error) {
        console.error(error);
        if (error.message === "Consultant not found") {
            return reply.status(404).send({ error: error.message });
        }
        if (error.message === "User must be a consultant or admin to teach classes") {
            return reply.status(403).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to create class" });
    }
}
async function getClassHandler(request, reply) {
    const params = request.params;
    try {
        const classData = await (0, class_service_1.getClassById)(params);
        if (!classData) {
            return reply.status(404).send({ error: "Class not found" });
        }
        reply.send(classData);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get class" });
    }
}
async function getClassesHandler(request, reply) {
    const query = request.query;
    try {
        const result = await (0, class_service_1.getClasses)(query || {});
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get classes" });
    }
}
async function updateClassHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const classData = await (0, class_service_1.updateClass)(params, body);
        reply.send(classData);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Class not found" });
        }
        if (error.message === "Consultant not found") {
            return reply.status(404).send({ error: error.message });
        }
        if (error.message === "User must be a consultant or admin to teach classes") {
            return reply.status(403).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to update class" });
    }
}
async function deleteClassHandler(request, reply) {
    const params = request.params;
    try {
        const result = await (0, class_service_1.deleteClass)(params);
        reply.send(result);
    }
    catch (error) {
        console.error(error);
        if (error?.code === "P2025") {
            return reply.status(404).send({ error: "Class not found" });
        }
        if (error.message ===
            "Cannot delete class with active enrollments. Please deactivate enrollments first.") {
            return reply.status(409).send({ error: error.message });
        }
        reply.status(500).send({ error: "Failed to delete class" });
    }
}
async function enrollStudentHandler(request, reply) {
    const params = request.params;
    const body = request.body;
    try {
        const enrollment = await (0, class_service_1.enrollStudent)(params, body);
        reply.code(201).send(enrollment);
    }
    catch (error) {
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
async function unenrollStudentHandler(request, reply) {
    const { id: classId, studentId } = request.params;
    try {
        const result = await (0, class_service_1.unenrollStudent)({ id: classId }, studentId);
        reply.send(result);
    }
    catch (error) {
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
async function getClassEnrollmentsHandler(request, reply) {
    const params = request.params;
    try {
        const enrollments = await (0, class_service_1.getClassEnrollments)(params);
        reply.send(enrollments);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ error: "Failed to get class enrollments" });
    }
}
//# sourceMappingURL=class.controller.js.map