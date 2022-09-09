"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const commonRoute_1 = require("./routes/commonRoute");
const folderRoute_1 = require("./routes/folderRoute");
const configuration_1 = require("./config/configuration");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port || 3001, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:3001`);
});
(0, configuration_1.appConfiguration)(app);
(0, commonRoute_1.commonRoute)(app);
(0, folderRoute_1.folderRoute)(app);
//# sourceMappingURL=index.js.map