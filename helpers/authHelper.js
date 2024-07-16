import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hash password
export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
};
