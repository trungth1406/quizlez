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
exports.testSetService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const testSetService = function () {
    const findTestSetByFolderId = (id) => __awaiter(this, void 0, void 0, function* () {
        return prisma.testSet.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                folder_id: true,
                terms: {
                    select: {
                        id: true,
                        term: true,
                        definition: true,
                    },
                },
            },
            where: {
                folder_id: id,
            },
        });
    });
    const findTestSetByFolderIdAndName = (id, name) => __awaiter(this, void 0, void 0, function* () {
        return prisma.testSet.findMany({
            where: {
                folder_id: id,
                name: name,
            },
        });
    });
    const addNewTestSet = (testSetModel, folderId) => __awaiter(this, void 0, void 0, function* () {
        const terms = testSetModel.definitionCards.map((card) => {
            return {
                term: card.term,
                term_lang: '',
                definition: card.definition,
                definition_lang: '',
            };
        });
        return prisma.testSet.create({
            data: {
                name: testSetModel.title,
                description: testSetModel.description,
                terms: {
                    create: [...terms],
                },
                folder: {
                    connect: {
                        id: Number(folderId || testSetModel.folderId),
                    },
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                folder_id: true,
                terms: {
                    select: {
                        id: true,
                        term: true,
                        term_lang: true,
                        definition: true,
                        definition_lang: true,
                    },
                },
            },
        });
    });
    return {
        findTestSetByFolderId,
        findTestSetByFolderIdAndName,
        addNewTestSet,
    };
};
exports.testSetService = testSetService;
//# sourceMappingURL=testSetService.js.map