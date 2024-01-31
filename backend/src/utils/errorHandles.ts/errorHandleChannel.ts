import { Response } from "express";
import { HttpStatusCode } from "../HttpStatusCode";

const errorHandlerChannel = (res: Response, error: any) => {
  console.error(error);

  let status = HttpStatusCode.InternalServerError;
  let message = "Internal Server Error";

  if (error.channel) {
    status = HttpStatusCode.UnprocessableEntity;
    message = error.channel;
  }

  res.status(status).json({ success: false, message });
};

export default errorHandlerChannel;
