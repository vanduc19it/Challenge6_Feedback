import validator from "validator";

interface RegisterInput {
  email: string;
  password: string;
}

export interface RegisterErrors {
  email?: string;
  password?: string;
}

const validateRegisterInput = (
  data: RegisterInput
): { errors: RegisterErrors; isValid: boolean } => {
  const errors: RegisterErrors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (
    !validator.isLength(data.password, { min: 6 }) ||
    !/(?=.*[a-z])/.test(data.password) ||
    !/(?=.*[A-Z])/.test(data.password) ||
    !/(?=.*\d)/.test(data.password)
  ) {
    errors.password =
      "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one number";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

export default validateRegisterInput;
