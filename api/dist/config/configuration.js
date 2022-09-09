"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfiguration = void 0;
const responseBody_1 = require("../middlewares/responseBody");
const cors = require('cors');
const appConfiguration = (app) => {
    app.use(cors({
        origin: '*',
    }));
    app.use(responseBody_1.repsonseBodyMiddleware);
};
exports.appConfiguration = appConfiguration;
//# sourceMappingURL=configuration.js.map