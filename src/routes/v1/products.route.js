import express from 'express';
import { productsController } from '../../controllers/products.controller.js';
import authenticateJWT from '../../middlewares/authenticateJWT.js';
// import {} from ''

const router = express.Router();

router.route('/')
    .post(authenticateJWT, productsController.createProduct)
    .get(productsController.getAllProducts); 

router.route('/:id')
    .put(authenticateJWT, productsController.updateProduct)
    .delete(authenticateJWT, productsController.deleteProduct)
    .get(productsController.getProduct);

export const productsRouter = router;
