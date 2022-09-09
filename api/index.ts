import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { commonRoute } from './routes/commonRoute';
import { repsonseBodyMiddleware } from './middlewares/responseBody';
import { folderRoute } from './routes/folderRoute';
import { appConfiguration } from './config/configuration';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port || 3001, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:3001`);
});

appConfiguration(app);


commonRoute(app);
folderRoute(app);
