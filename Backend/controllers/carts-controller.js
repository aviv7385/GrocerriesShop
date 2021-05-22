const express = require("express");
const cartsLogic = require("../business-logic-layer/carts-logic");
const CartItem = require("../models/cart-item");

const router = express.Router(); // Only the routing mechanism for our controller.

// POST - add one cart (http://localhost:3001/api/carts) ** LoggedIn User access only **
router.post("/", async (request, response) => {
    try {
        const addedCart = await cartsLogic.addNewCartAsync(request.body);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// // GET - get all carts (http://localhost:3001/api/carts) ** LoggedIn User access only **
// router.get("/", async (request, response) => {
//     try {
//         const carts = await cartsLogic.getAllCartsAsync();
//         response.json(carts);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// })

// POST - add one item to the cart (http://localhost:3001/api/carts/items) ** LoggedIn User access only **
router.post("/items", async (request, response) => {
    try {
        const item = new CartItem(request.body);
        const addedItem = await cartsLogic.addNewItemAsync(item);
        response.status(201).json(addedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET all items from a cart (http://localhost:3001/api/carts/1) ** LoggedIn User access only **
router.get("/:cartId", async (request, response) => {
    try {
        const cartId = +request.params.cartId;
        const items = await cartsLogic.getAllCartItemsAsync(cartId);
        if (items.length === 0) {
            response.status(404).send(`cart is empty or not found`);
            return;
        }
        response.json(items);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET the total price of a specific cart (http://localhost:3001/api/carts/total-price/1) ** LoggedIn User access only **
router.get("/total-price/:cartId", async (request, response) => {
    try {
        const cartId = +request.params.cartId;
        const totalPrice = await cartsLogic.getTotalPriceAsync(cartId);
        response.json(totalPrice);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// DELETE - remove one item from a specific cart (http://localhost:3001/api/carts/items/6/12) ** LoggedIn User access only **
router.delete("/items/:cartId/:itemId", async (request, response) => {
    try {
        const cartId = +request.params.cartId;
        const itemId = +request.params.itemId;
        await cartsLogic.deleteCartItemAsync(cartId, itemId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH - update the quantity of an item (http://localhost:3001/api/carts/items-quantity/12) ** LoggedIn User access only **
router.patch("/items-quantity/:itemId", async (request, response) => {
    try {
        const cartItem = request.body;
        cartItem.itemId = +request.params.itemId;
        const updatedCartItem = await cartsLogic.updateQuantityOfItem(cartItem);

        if (!updatedCartItem) {
            response.status(404).send(`id ${updatedCartItem.itemId} not found.`);
            return;
        }
        response.json(updatedCartItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
