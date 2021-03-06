const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const fileHandler = require("../helpers/file-handler");
const router = express.Router(); // Only the routing mechanism for our controller.

// POST - add one order (http://localhost:3001/api/orders) ** LoggedIn User access only **
router.post("/", async (request, response) => {
    try {
        const order = await ordersLogic.addNewOrderAsync(request.body);
        response.status(201).json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET - get details of a final order - for the receipt (http://localhost:3001/api/orders/receipt/18) ** LoggedIn User access only **
router.get("/receipt/:orderId", async (request, response) => {
    try {
        const orderId = +request.params.orderId;
        const order = await ordersLogic.getOrderDetailsAsync(orderId);
        response.json(order);
        // save data to file
        const newFileName = "./receipts/order" + orderId + ".text";
        for (const item of order) {
            const orderItem = item.productName + ", Quantity: " + item.quantity + ", Total Price: " + item.totalPrice + "\n\n";
            fileHandler.saveToFile(newFileName, orderItem);
        }
        const data = await ordersLogic.getOrderFinalPriceAsync(orderId);
        const finalOrderPrice = "Final Price: " + data[0].finalPrice + "\n";
        fileHandler.saveToFile(newFileName, finalOrderPrice);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// GET one order by cart Id (http://localhost:3001/api/order/18)
router.get("/:cartId", async (request, response) => {
    try {
        const cartId = +request.params.cartId;
        const order = await ordersLogic.getOneOrderAsync(cartId);
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET all orders (http://localhost:3001/api/order/)
router.get("/", async (request, response) => {
    try {
        const orders = await ordersLogic.getAllOrders();
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;
