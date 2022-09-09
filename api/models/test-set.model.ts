import { CommonDataModel } from './common.model';

export interface TestSetModel extends CommonDataModel {
    title: string;
    description: string;
    folderId: number;
    definitionCards: DefinitionCardModel[];
}

export interface DefinitionCardModel extends CommonDataModel {
    term: string;
    definition: string;
    testSetId: number;
}
