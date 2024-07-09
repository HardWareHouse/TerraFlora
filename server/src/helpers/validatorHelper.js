import validator from "validator";

export const isValidUUID = (id) => {
  return validator.isUUID(id);
};

export const isValidEmail = (email) => {
  return validator.isEmail(email);
};

export const isStrongPassword = (password) => {
  return validator.isStrongPassword(password);
};