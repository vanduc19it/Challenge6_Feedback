import { Request, Response, NextFunction } from "express";
import validateRegisterInput from "../validations/registerValidation";

const registerValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  next();
};

export { registerValidationMiddleware };
