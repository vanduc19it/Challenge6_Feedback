import * as constants from "./constants";

export const validateEmail = (email: string) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    return constants.EMAIL_REQUIRED;
  } else if (!emailRegex.test(email)) {
    return constants.INVALID_EMAIL;
  }
  return null;
};

export const validateRegisterPassword = (value: string) => {
  if (!value) {
    return constants.PASSWORD_REQUIRED;
  } else if (value.length < 6) {
    return constants.PASSWORD_LENGTH;
  } else if (!/[a-z]/.test(value)) {
    return constants.LOWERCASE_REQUIRED;
  } else if (!/[A-Z]/.test(value)) {
    return constants.UPPERCASE_REQUIRED;
  } else if (!/\d/.test(value)) {
    return constants.NUMBER_REQUIRED;
  }
  return null;
};

export const validateEditProfilePassword = (value: string) => {
  if (!value) {
    return null;
  } else if (value.length < 6) {
    return constants.PASSWORD_LENGTH;
  } else if (!/[a-z]/.test(value)) {
    return constants.LOWERCASE_REQUIRED;
  } else if (!/[A-Z]/.test(value)) {
    return constants.UPPERCASE_REQUIRED;
  } else if (!/\d/.test(value)) {
    return constants.NUMBER_REQUIRED;
  }
  return null;
};

export const validateLoginPassword = (value: string) => {
  if (!value) {
    return constants.PASSWORD_REQUIRED;
  }
  return null;
};

export const validateName = (name: string) => {
  const trimmedName = name.trim();
  const nameRegex = /^[a-zA-Z]+([a-zA-Z ]*)$/;
  if (!trimmedName) {
    return constants.NAME_REQUIRED;
  } else if (!nameRegex.test(trimmedName)) {
    return constants.INVALID_NAME;
  }
  return null;
};

export const validateBio = (bio: string) => {
  if (!bio) {
    return constants.BIO_REQUIRED;
  } else if (bio.length > 150) {
    return constants.BIO_MAX_LENGTH;
  }
  return null;
};

export const validatePhone = (phone: string) => {
  const phoneRegex = /^\d{8,12}$/;
  if (!phone) {
    return constants.PHONE_REQUIRED;
  } else if (!phoneRegex.test(phone)) {
    return constants.INVALID_PHONE;
  }
  return null;
};

export const validateChannelName = (name: string) => {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return constants.CHANNEL_NAME_REQUIRED;
  }
  return null;
};

export const validateChannelDesc = (description: string) => {
  const trimmedDescription = description.trim();
  if (!trimmedDescription) {
    return constants.CHANNEL_DESCRIPTION_REQUIRED;
  }
  return null;
};
