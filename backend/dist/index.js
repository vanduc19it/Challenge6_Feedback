"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL;
mongoose_1.default.connect(`${mongodb_url}`)
    .then(() => {
    console.log("[MongoDB]: Connected successfully");
    app_1.default.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error(`[MongoDB]: Connection error: ${error}`);
    process.exit(1);
});
