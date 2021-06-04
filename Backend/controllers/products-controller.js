const express = require("express");
const path = require("path");
const productsLogic = require("../business-logic-layer/products-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");

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

// GET all products by Category id(http://localhost:3001/api/products/categories/2)
router.get("/categories/:categoryId", verifyLoggedIn, async (request, response) => {
    try {
        const categoryId = +request.params.categoryId;
        const products = await productsLogic.getAllProductsByCategoryAsync(categoryId);

        response.json(products);
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
router.get("/:productId", verifyLoggedIn, async (request, response) => {
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

module.exports = router;