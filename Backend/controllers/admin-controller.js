const express = require("express");
const Product = require("../models/product");
const productsLogic = require("../business-logic-layer/products-logic");

const router = express.Router(); // Only the routing mechanism for our controller.


// POST - add one product (http://localhost:3001/api/admin/products) ** ADMIN access only **
router.post("/", async (request, response) => {
    try {
        const product = new Product(request.body);
        const addedProduct = await productsLogic.addOneProductAsync(product, request.files ? request.files.image : null);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT - update full product by id (http://localhost:3001/api/admin/products/3) ** ADMIN access only ***
router.put("/:productId", async (request, response) => {
    try {
        const product = new Product(request.body);
        product.productId = +request.params.productId;
        const updatedProduct = await productsLogic.editFullProductAsync(product);
        if (!updatedProduct) {
            response.status(404).send(`id ${productId} not found`);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH - update partial product info (http://localhost:3001/api/admin/products/3) ** ADMIN access only ***
router.patch("/:productId", async (request, response) => {
    try {
        const product = new Product(request.body);
        product.productId = +request.params.productId;
        const updatedProduct = await productsLogic.editPartialProductAsync(product, request.files ? request.files.image : null);
        if (!updatedProduct) {
            response.status(404).send(`id ${productId} not found`);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;