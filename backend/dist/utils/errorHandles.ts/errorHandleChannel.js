"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCode_1 = require("../HttpStatusCode");
const errorHandlerChannel = (res, error) => {
    console.error(error);
    let status = HttpStatusCode_1.HttpStatusCode.InternalServerError;
    let message = "Internal Server Error";
    if (error.channel) {
        status = HttpStatusCode_1.HttpStatusCode.UnprocessableEntity;
        message = error.channel;
    }
    res.status(status).json({ success: false, message });
};
exports.default = errorHandlerChannel;
