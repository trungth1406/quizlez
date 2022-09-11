import { PrismaClient } from '@prisma/client';
import { MenuModel } from '../models/menu.model';
import { menuServices } from './commonServices';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export const folderService = function () {
    const menuService = menuServices();

    const getAllFolders = async (params: { name?: string }) => {
        const allFolders = await prisma.folder.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                name: {
                    contains: params.name?.toLowerCase() || '',
                },
            },
        });
        return allFolders;
    };

    const addNewFolder = async (menuModel: MenuModel) => {
        const menu = await menuService.findById(menuModel.parentMenuId);
        return prisma.folder.create({
            data: {
                name: menuModel.name,
                code: menuModel.code || menuModel.name,
                menu: {
                    connect: {
                        id: menu?.id,
                    },
                },
            },
        });
    };

    const findFolderById = async (
        folderId: number,
        params?: { size?: number }
    ) => {
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
                    take: params?.size || 10,
                },
            },
            where: {
                id: folderId,
            },
        });
    };

    return {
        addNewFolder,
        getAllFolders,
        findFolderById,
    };
};
