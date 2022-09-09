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
exports.commonRoute = void 0;
const commonServices_1 = require("../services/commonServices");
const commonRoute = (app) => {
    const menuService = (0, commonServices_1.menuServices)();
    app.route('/menus').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = req.query;
        if (queryParams['name']) {
            const name = queryParams['name'];
            const menu = yield menuService.findByName(name);
            res.status(200).send(menu);
        }
        else {
            const menu = yield menuService.findAllMenus(null);
            res.status(200).send(menu);
        }
    }));
    app.get('/menus/:id/folders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const menuId = req.params.id;
        console.debug(menuId);
        res.status(200).send(yield menuService.findFoldersById(Number(menuId)));
    }));
};
exports.commonRoute = commonRoute;
//# sourceMappingURL=commonRoute.js.map