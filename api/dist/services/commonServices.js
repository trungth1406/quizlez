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
exports.menuServices = void 0;
const client_1 = require("@prisma/client");
const menu_model_1 = require("../models/menu.model");
const prisma = new client_1.PrismaClient();
const menuServices = () => {
    const addNewMenu = (menuModel) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.menu.create({
            data: {
                name: menuModel.name,
                parent_menu_id: menuModel.parentMenuId,
            },
        });
    });
    const menuFields = {
        id: true,
        name: true,
        folders: true,
    };
    const findAllMenus = (_params) => __awaiter(void 0, void 0, void 0, function* () {
        const allMenu = yield prisma.menu.findMany({
            select: menuFields,
        });
        return allMenu.map(mapToModel());
    });
    const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.menu.findUnique({
            select: menuFields,
            where: {
                id: id,
            },
        });
    });
    const findByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
        const menuByname = yield prisma.menu.findFirst({
            select: menuFields,
            where: {
                folders: {
                    some: {
                        name: {
                            equals: name,
                        },
                    },
                },
            },
        });
        return mapToModel()(menuByname);
    });
    const findFoldersById = (menuId) => __awaiter(void 0, void 0, void 0, function* () {
        const menuById = yield prisma.menu.findUnique({
            select: menuFields,
            where: {
                id: menuId,
            },
        });
        return mapToModel()(menuById);
    });
    const mapToModel = () => {
        return (entity) => {
            if (entity === null) {
                return null;
            }
            console.log();
            const menuModel = {
                id: entity.id,
                name: entity.name,
                code: null,
                parentMenuId: entity.parent_menu_id,
                type: entity.parent_menu_id === null
                    ? menu_model_1.MenuType.ROOT
                    : menu_model_1.MenuType.SUB,
                subMenus: entity.folders,
            };
            return menuModel;
        };
    };
    return {
        addNewMenu,
        findById,
        findAllMenus,
        findByName,
        findFoldersById,
    };
};
exports.menuServices = menuServices;
//# sourceMappingURL=commonServices.js.map