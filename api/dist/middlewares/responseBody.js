"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repsonseBodyMiddleware = void 0;
const common_model_1 = require("../models/common.model");
const repsonseBodyMiddleware = (_req, res, next) => {
    const oldSend = res.send;
    res.send = function (data) {
        const commonResponse = {};
        commonResponse.message = {
            status: common_model_1.ResponseStatus.SUCCESS,
        };
        commonResponse.data = data;
        data = commonResponse;
        res.send = oldSend;
        res.set('Access-Control-Allow-Origin', '*');
        return res.send(data);
    };
    next();
};
exports.repsonseBodyMiddleware = repsonseBodyMiddleware;
//# sourceMappingURL=responseBody.js.map