const express = require("express");
const path = require("path");
const Product = require("../models/product");
const productsLogic = require("../business-logic-layer/products-logic");

const router = express.Router(); // Only the routing mechanism for our controller.

// GET all categories (http://localhost:3001/api/products/categories)
router.get("/categories", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET one category by category id (http://localhost:3001/api/products/categories/2)
router.get("/categories/:categoryId", async (request, response) => {
    try {
        const categoryId = +request.params.categoryId;
        const category = await productsLogic.getOneCategoryAsync(categoryId);
        if (!category) {
            response.status(404).send(`id ${categoryId} not found`);
        }
        response.json(category);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// GET all products (http://localhost:3001/api/products)
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET one product by product id (http://localhost:3001/api/products/3)
router.get("/:productId", async (request, response) => {
    try {
        const productId = +request.params.productId;
        const product = await productsLogic.getOneProductAsync(productId);
        if (!product) {
            response.status(404).send(`id ${productId} not found`);
            return;
        }
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET image  (http://localhost:3001/api/products/images/imageName.png) 
router.get("/images/:imageFileName", async (request, response) => {
    try {
        const imageFileName = request.params.imageFileName;
        const absolutePath = path.join(__dirname, "..", "images", imageFileName);
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST - add one product (http://localhost:3001/api/products) ** ADMIN access only **
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

// PUT - update full product by id (http://localhost:3001/api/products/3) ** ADMIN access only ***
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

// PATCH - update partial product info (http://localhost:3001/api/products/3) ** ADMIN access only ***
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