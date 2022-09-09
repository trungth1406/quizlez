import { Folder, Menu, PrismaClient } from '@prisma/client';
import { MenuModel, MenuType } from '../models/menu.model';

const prisma = new PrismaClient();

export const menuServices = () => {
    const addNewMenu = async (menuModel: MenuModel) => {
        return prisma.menu.create({
            data: {
                name: menuModel.name,
                parent_menu_id: menuModel.parentMenuId,
            },
        });
    };

    const menuFields = {
        id: true,
        name: true,
        folders: true,
    };

    const findAllMenus = async (_params: any) => {
        const allMenu = await prisma.menu.findMany({
            select: menuFields,
        });
        return allMenu.map(mapToModel());
    };

    const findById = async (id: number) => {
        return prisma.menu.findUnique({
            select: menuFields,
            where: {
                id: id,
            },
        });
    };

    const findByName = async (name: string) => {
        const menuByname = await prisma.menu.findFirst({
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
    };

    const findFoldersById = async (menuId: number) => {
        const menuById = await prisma.menu.findUnique({
            select: menuFields,
            where: {
                id: menuId,
            },
        });
        return mapToModel()(menuById);
    };

    const mapToModel = () => {
        return (entity: any) => {
            if (entity === null) {
                return null;
            }
            console.log();

            const menuModel: MenuModel = {
                id: entity.id,
                name: entity.name,
                code: null,
                parentMenuId: entity.parent_menu_id,
                type:
                    entity.parent_menu_id === null
                        ? MenuType.ROOT
                        : MenuType.SUB,
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
