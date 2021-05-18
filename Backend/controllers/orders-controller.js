const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const Order = require("../models/order");
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











module.exports = router;
