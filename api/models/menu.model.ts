import { CommonDataModel } from './common.model';

export interface MenuModel extends CommonDataModel {
    parentMenuId: number;
    subMenus?: FolderModel[];
    type: MenuType;
}

export interface FolderModel extends CommonDataModel {}

export enum MenuType {
    ROOT,
    SUB,
}
