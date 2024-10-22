import express from 'express';
import { accessController } from '../../controllers/access.controller.js';

const router = express.Router();

router.route('/register').post(accessController.register);

export const accessRouter = router;
