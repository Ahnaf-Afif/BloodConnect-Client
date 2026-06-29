/**
 * Input validation utilities for the application
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validatePhoneNumber = (phone) => {
  // Bangladesh phone number format
  const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateName = (name) => {
  // At least 2 characters, no special characters
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const validateBloodGroup = (bloodGroup) => {
  const validGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  return validGroups.includes(bloodGroup);
};

export const validateDate = (date) => {
  return new Date(date) instanceof Date && !isNaN(new Date(date));
};

export const validateTime = (time) => {
  // HH:MM format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Form validation error messages
 */
export const getValidationError = (field, value) => {
  switch (field) {
    case "email":
      return !validateEmail(value) ? "Invalid email address" : "";
    case "password":
      return !validatePassword(value) ? "Password must be at least 6 characters" : "";
    case "phone":
      return !validatePhoneNumber(value) ? "Invalid phone number" : "";
    case "name":
      return !validateName(value) ? "Name must be at least 2 characters and contain only letters" : "";
    case "bloodGroup":
      return !validateBloodGroup(value) ? "Invalid blood group" : "";
    case "date":
      return !validateDate(value) ? "Invalid date" : "";
    case "time":
      return !validateTime(value) ? "Invalid time format (HH:MM)" : "";
    default:
      return "";
  }
};
