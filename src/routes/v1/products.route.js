import express from 'express';
import { productsController } from '../../controllers/products.controller.js';

const router = express.Router();

router.route('/')
    .post(productsController.createProduct)
    .get(productsController.getAllProducts); 

router.route('/:id')
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)
    .get(productsController.getProduct);

export const productsRouter = router;
