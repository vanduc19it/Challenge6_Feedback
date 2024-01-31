"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCode_1 = require("../HttpStatusCode");
const errorHandlerRegister = (res, error) => {
    console.error(error);
    let status = HttpStatusCode_1.HttpStatusCode.InternalServerError;
    let message = "Internal Server Error";
    if (error.email) {
        status = HttpStatusCode_1.HttpStatusCode.UnprocessableEntity;
        message = error.email;
    }
    else if (error.password) {
        status = HttpStatusCode_1.HttpStatusCode.BadRequest;
        message = error.password;
    }
    res.status(status).json({ success: false, message });
};
exports.default = errorHandlerRegister;
