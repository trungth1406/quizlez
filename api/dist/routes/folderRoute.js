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
exports.folderRoute = void 0;
const folderService_1 = require("../services/folderService");
const testSetService_1 = require("../services/testSetService");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const folderRoute = function (app) {
    const folderServices = (0, folderService_1.folderService)();
    const testSetServices = (0, testSetService_1.testSetService)();
    app.route('/folders')
        .get((req, res) => __awaiter(this, void 0, void 0, function* () {
        const name = req.query.name;
        const allFolders = yield folderServices.getAllFolders({ name: name });
        res.send(allFolders).status(200);
    }))
        .post(jsonParser, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const requestBody = req.body;
        if (requestBody) {
            const addNewFolder = (menuModel) => {
                return folderServices.addNewFolder(menuModel);
            };
            res.status(200).send(yield addNewFolder(requestBody));
        }
    }));
    app.get('/folders/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const requestParam = req.params;
        const { id } = requestParam;
        const size = req.query.size;
        const folder = yield folderServices.findFolderById(Number(id), {
            size: size ? 10 : Number(size),
        });
        res.send(folder).status(200);
    }));
    app.get('/folders/:id/testSets', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const requestParam = req.params;
        const query = req.query;
        const folderId = requestParam['id'];
        if (folderId) {
            const folder = yield testSetServices.findTestSetByFolderId(Number(folderId));
            res.send(folder).status(200);
            if (query) {
                console.log(query);
            }
        }
    }));
    app.post('/folders/:id/testSets', jsonParser, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const requestParam = req.params;
        const folderId = requestParam['id'];
        const testSet = yield testSetServices.addNewTestSet(body, folderId);
        res.send(testSet).status(200);
    }));
};
exports.folderRoute = folderRoute;
//# sourceMappingURL=folderRoute.js.map