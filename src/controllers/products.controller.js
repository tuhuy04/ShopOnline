import { productsService } from "../services/products.service.js";
import { productsModel } from "../models/products.model.js";
import { HTTP_STATUS_CODE } from "../utilities/constants.js";

const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const existingProduct = await productsModel.findProduct({ name, price, description });

        if (existingProduct) {
            await productsModel.updateStock(existingProduct.id, stock);
            return res.status(HTTP_STATUS_CODE.OK).send({
                message: 'Product stock updated successfully',
                productId: existingProduct.id,
            });
        } else {
            const productId = await productsModel.createProduct(req.body);
            return res.status(HTTP_STATUS_CODE.CREATED).send({ message: 'Product created successfully', productId });
        }
    } catch (error) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: new Error(error).message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock } = req.body;

        const existingProduct = await productsModel.getProductById(id);
        if (!existingProduct) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ message: 'Product not found' });
        }

        const updatedData = {
            name: name !== undefined ? name : existingProduct.name,
            price: price !== undefined ? price : existingProduct.price,
            description: description !== undefined ? description : existingProduct.description,
            stock: stock !== undefined ? stock : existingProduct.stock,
        };

        await productsModel.updateProduct(id, updatedData);
        return res.status(HTTP_STATUS_CODE.OK).send({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const result = await productsService.removeProduct(req.params.id);
        if(result) {
            res.status(HTTP_STATUS_CODE.OK).send({ message: 'Product deleted successfully' });
        }else {
            res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await productsService.getProduct(req.params.id);
        if(product) {
            res.status(HTTP_STATUS_CODE.OK).send(product);
        }else {
            res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ error: 'Product not found' });
        }    
    } catch (error) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });  
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productsService.listProduct();
        res.status(HTTP_STATUS_CODE.OK).send(products);
    } catch (error) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ error: error.message });  
    }
}

export const productsController = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
}