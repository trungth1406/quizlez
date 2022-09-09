import { NextFunction, Request, Response } from 'express';
import { ApiResponse, ResponseStatus } from '../models/common.model';

export const repsonseBodyMiddleware = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const oldSend = res.send;

    res.send = function (data): any {
        const commonResponse: ApiResponse<any> = {} as ApiResponse<any>;

        commonResponse.message = {
            status: ResponseStatus.SUCCESS,
        };
        commonResponse.data = data;
        data = commonResponse;
        res.send = oldSend;
        res.set('Access-Control-Allow-Origin', '*');
        return res.send(data);
    };
    next();
};
