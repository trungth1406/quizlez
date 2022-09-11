import { Express } from 'express';
import { request } from 'http';
import { MenuModel } from '../models/menu.model';
import { folderService } from '../services/folderService';
import { testSetService } from '../services/testSetService';
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

export const folderRoute = function (app: Express) {
    const folderServices = folderService();
    const testSetServices = testSetService();

    app.route('/folders')
        .get(async (req, res) => {
            const name = req.query.name;
            const allFolders = await folderServices.getAllFolders({ name : name as string });
            res.send(allFolders).status(200);
        })
        .post(jsonParser, async (req, res) => {
            const requestBody = req.body;
            if (requestBody) {
                const addNewFolder = (menuModel: MenuModel) => {
                    return folderServices.addNewFolder(menuModel);
                };
                res.status(200).send(await addNewFolder(requestBody));
            }
        });

    app.get('/folders/:id', async (req, res) => {
        const requestParam: any = req.params;
        const { id } = requestParam;
        const size = req.query.size;

        const folder = await folderServices.findFolderById(Number(id), {
            size: size ? 10 : Number(size),
        });
        res.send(folder).status(200);
    });

    app.get('/folders/:id/testSets', async (req, res) => {
        const requestParam: any = req.params;
        const query: any = req.query;
        const folderId = requestParam['id'];
        if (folderId) {
            const folder = await testSetServices.findTestSetByFolderId(
                Number(folderId)
            );
            res.send(folder).status(200);

            if (query) {
                console.log(query);
            }
        }
    });

    app.post('/folders/:id/testSets', jsonParser, async (req, res) => {
        const body: any = req.body;
        const requestParam: any = req.params;
        const folderId = requestParam['id'];
        const testSet = await testSetServices.addNewTestSet(body, folderId);
        res.send(testSet).status(200);
    });
};
