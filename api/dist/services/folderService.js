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
const prisma = new client_1.PrismaClient();
const folderService = function () {
    const menuService = (0, commonServices_1.menuServices)();
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
    const findFolderById = (id) => __awaiter(this, void 0, void 0, function* () {
        return prisma.folder.findUnique({
            select: {
                id: true,
                name: true,
                code: true,
            },
            where: {
                id: id,
            },
        });
    });
    return {
        addNewFolder,
        findFolderById,
    };
};
exports.folderService = folderService;
//# sourceMappingURL=folderService.js.map