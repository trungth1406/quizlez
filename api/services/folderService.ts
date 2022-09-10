import { PrismaClient } from '@prisma/client';
import { MenuModel } from '../models/menu.model';
import { menuServices } from './commonServices';

const prisma = new PrismaClient();

export const folderService = function () {
    const menuService = menuServices();

    const getAllFolders = async () => {
        const allFolders = await prisma.folder.findMany();
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

    const findFolderById = async (id: number) => {
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
    };

    return {
        addNewFolder,
        getAllFolders,
        findFolderById,
    };
};
