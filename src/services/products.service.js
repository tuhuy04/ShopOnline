
import { productsModel } from '../models/products.model.js';

const addProduct = async (productData) => {
    return await productsModel.createProduct(productData);
}

const editProduct = async (id, productData) => {
    return await productsModel.updateProduct(id, productData);
}

const removeProduct = async (id) => {
    return await productsModel.deleteProduct(id);
}

const getProduct = async (id) => {
    return await productsModel.getProductById(id);
}

const listProduct = async () => {
    return await productsModel.getAllProducts();
}

export const productsService = {
    addProduct,
    editProduct,
    removeProduct,
    getProduct,
    listProduct
}