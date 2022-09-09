import { PrismaClient } from '@prisma/client';
import { TestSetModel } from '../models/test-set.model';
const prisma = new PrismaClient();

export const testSetService = function () {
    const findTestSetByFolderId = async (id: number) => {
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
    };

    const findTestSetByFolderIdAndName = async (id: number, name: string) => {
        return prisma.testSet.findMany({
            where: {
                folder_id: id,
                name: name,
            },
        });
    };

    const addNewTestSet = async (
        testSetModel: TestSetModel,
        folderId?: number
    ) => {
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
    };

    return {
        findTestSetByFolderId,
        findTestSetByFolderIdAndName,
        addNewTestSet,
    };
};
