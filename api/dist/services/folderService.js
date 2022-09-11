"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderService = void 0;
const client_1 = require("@prisma/client");
const commonServices_1 = require("./commonServices");
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const folderService = function () {
    const menuService = (0, commonServices_1.menuServices)();
    const getAllFolders = (params) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const allFolders = yield prisma.folder.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                name: {
                    contains: ((_a = params.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '',
                },
            },
        });
        return allFolders;
    });
    const addNewFolder = (menuModel) => __awaiter(this, void 0, void 0, function* () {
        const menu = yield menuService.findById(menuModel.parentMenuId);
        return prisma.folder.create({
            data: {
                name: menuModel.name,
                code: menuModel.code || menuModel.name,
                menu: {
                    connect: {
                        id: menu === null || menu === void 0 ? void 0 : menu.id,
                    },
                },
            },
        });
    });
    const findFolderById = (folderId, params) => __awaiter(this, void 0, void 0, function* () {
        return prisma.folder.findFirst({
            select: {
                id: true,
                name: true,
                code: true,
                testSet: {
                    select: {
                        id: true,
                        name: true,
                    },
                    take: (params === null || params === void 0 ? void 0 : params.size) || 10,
                },
            },
            where: {
                id: folderId,
            },
        });
    });
    return {
        addNewFolder,
        getAllFolders,
        findFolderById,
    };
};
exports.folderService = folderService;
//# sourceMappingURL=folderService.js.map