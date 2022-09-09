import { Express } from 'express';
import { menuServices } from '../services/commonServices';

export const commonRoute = (app: Express) => {
    const menuService = menuServices();
    app.route('/menus').get(async (req, res) => {
        const queryParams = req.query;
        if (queryParams['name']) {
            const name = queryParams['name'] as string;
            const menu = await menuService.findByName(name);
            res.status(200).send(menu);
        } else {
            const menu = await menuService.findAllMenus(null);
            res.status(200).send(menu);
        }
    });

    app.get('/menus/:id/folders', async (req, res) => {
        const menuId = req.params.id;
        console.debug(menuId);

        res.status(200).send(await menuService.findFoldersById(Number(menuId)));
    });
};
