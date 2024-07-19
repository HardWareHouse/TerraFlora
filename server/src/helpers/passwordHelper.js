import bcrypt from "bcryptjs";

export const isPasswordValid = (password) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };
  
export const isPasswordExpired = (lastUpdatedPassword) => {
    const now = new Date();
    const diffInDays = Math.floor(
    (now - lastUpdatedPassword) / (1000 * 60 * 60 * 24)
    );
    return diffInDays >= 60;
};

export const comparePasswords = async (inputPassword, userPassword) => {
  try {
    return await bcrypt.compare(inputPassword, userPassword);
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe:', error);
    throw error;
  }
};