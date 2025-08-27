"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const hash_1 = require("../../utils/hash");
async function createUser(input) {
    const { password, ...rest } = input;
    const { hash, salt } = (0, hash_1.hashPassword)(password);
    const user = await prisma_1.default.user.create({
        data: {
            ...rest,
            password: hash,
            salt,
        },
    });
    return user;
}
async function getUserById(params) {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
}
async function getUsers(query) {
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const skip = (page - 1) * limit;
    const whereClause = query.role ? { role: query.role } : {};
    const [users, total] = await Promise.all([
        prisma_1.default.user.findMany({
            where: whereClause,
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma_1.default.user.count({
            where: whereClause,
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        users,
        total,
        page,
        limit,
        totalPages,
    };
}
async function updateUser(params, input) {
    const updateData = { ...input };
    if (input.password) {
        const { hash, salt } = (0, hash_1.hashPassword)(input.password);
        updateData.password = hash;
        updateData.salt = salt;
    }
    const user = await prisma_1.default.user.update({
        where: {
            id: params.id,
        },
        data: updateData,
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
}
async function deleteUser(params) {
    await prisma_1.default.user.delete({
        where: {
            id: params.id,
        },
    });
    return { message: "User deleted successfully" };
}
//# sourceMappingURL=user.service.js.map