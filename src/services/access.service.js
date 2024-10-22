

import { usersModel } from '../models/users.model.js';
import bcrypt from 'bcrypt';

const saltRounds = 10; 

const register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
    return await usersModel.createNew(userData);
};

export const accessService = {
    register,
};
