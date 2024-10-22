'use strict';

import { accessService } from '../services/access.service.js';
import { HTTP_STATUS_CODE } from '../utilities/constants.js';

const register = async (req, res) => {
    try {
        const userId = await accessService.register(req.body);
        res.status(HTTP_STATUS_CODE.CREATED).send({ message: 'User registered successfully', userId });
    } catch (error) {
        if (error.message === 'Username or Email already existed') {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
                error: error.message,
            });
        }
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({
            error: new Error(error).message,
        });
    }
};

export const accessController = {
    register,
};
