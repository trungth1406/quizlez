import { Express } from 'express';
import { repsonseBodyMiddleware } from '../middlewares/responseBody';
const cors = require('cors');

export const appConfiguration = (app: Express) => {
    app.use(
        cors({
            origin: '*',
        })
    );
    app.use(repsonseBodyMiddleware);
};
