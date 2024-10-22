'use strict';

import { pool } from '../configs/database.js';

const createProduct = async ({ name, price, description, stock }) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)',
            [name, price, description, stock]
        );
        return result.insertId; 
    } finally {
        connection.release();
    }
};

const updateProduct = async (id, { name, price, description, stock }) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            'UPDATE products SET name = ?, price = ?, description = ?, stock = ? WHERE id = ?',
            [name, price, description, stock, id]
        );
        return result.affectedRows; 
    } finally {
        connection.release();
    }
};

const deleteProduct = async (id) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    } finally {
        connection.release();
    }
};

const getProductById = async (id) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        return rows[0]; 
    } finally {
        connection.release();
    }
};

const getAllProducts = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        return rows;
    } finally {
        connection.release();
    }
};

const findProduct = async ({ name, price, description }) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM products WHERE name = ? AND price = ? AND description = ?',
            [name, price, description]
        );
        return rows[0]; // Return the first matching product, if any
    } finally {
        connection.release();
    }
};

const updateStock = async (id, stock) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            'UPDATE products SET stock = stock + ? WHERE id = ?',
            [stock, id]
        );
        return result.affectedRows; 
    } finally {
        connection.release();
    }
};

export const productsModel = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    findProduct,
    updateStock
};
