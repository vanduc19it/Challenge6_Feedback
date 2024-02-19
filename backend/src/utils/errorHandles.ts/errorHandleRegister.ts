import { Response } from "express";
import { HttpStatusCode } from "../HttpStatusCode";

const errorHandlerRegister = (res: Response, error: any) => {
  console.error(error);

  let status = HttpStatusCode.InternalServerError;
  let message = "Internal Server Error";

  if (error.email) {
    status = HttpStatusCode.UnprocessableEntity;
    message = error.email;
  } else if (error.password) {
    status = HttpStatusCode.BadRequest;
    message = error.password;
  }

  res.status(status).json({ success: false, message });
};

export default errorHandlerRegister;
