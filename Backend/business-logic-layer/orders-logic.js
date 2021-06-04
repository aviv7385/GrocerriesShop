const dal = require("../data-access-layer/dal");
const cartsLogic = require("./carts-logic");



// add new order
async function addNewOrderAsync(order) {
    const sql = `INSERT INTO orders(orderId, userId, cartId, cityId, shippingStreet, shippingDate, orderDate, cc4Digits) 
                VALUES(DEFAULT, ?, ?, ?, ?, ?, DEFAULT, RIGHT(${order.cc4Digits}, 4))`;
    const values = [order.userId, order.cartId, order.cityId, order.shippingStreet, order.shippingDate];
    const info = await dal.executeAsync(sql, values);
    order.orderId = info.insertId;
    // get the final price of the cart from the "cartitems" table
    const cartPrice = await cartsLogic.getTotalPriceAsync(order.cartId);
    order.finalPrice = cartPrice.totalCartPrice;
    // update the final price in the "orders" table
    const sqlFinalPrice = `UPDATE orders SET finalPrice=${order.finalPrice} WHERE orderId=${order.orderId}`;
    await dal.executeAsync(sqlFinalPrice);
    return order;
}

// get one order by cartId
async function getOneOrderAsync(cartId) {
    const sql = `SELECT * FROM orders WHERE cartId=${cartId}`;
    const order = await dal.executeAsync(sql);
    return order;
}

// get all orders
async function getAllOrders() {
    const sql = `SELECT * FROM orders`;
    const orders = await dal.executeAsync(sql);
    return orders;
}

// get order details (to create a receipt)
async function getOrderDetailsAsync(orderId) {
    const sql = `SELECT products.productName, cartitems.quantity, 
                        (cartitems.quantity*products.price) AS totalPrice
                        FROM ((cartitems
                        JOIN products ON products.productId=cartitems.productId)
                        JOIN orders ON orders.cartId=cartitems.cartId)
                        WHERE orders.orderId=${orderId}`;
    const details = await dal.executeAsync(sql);
    return details;
}

// get final order price (for the receipt)
async function getOrderFinalPriceAsync(orderId) {
    const sql = `SELECT finalPrice FROM orders WHERE orderId=${orderId}`;
    const finalPrice = await dal.executeAsync(sql);
    return finalPrice;
}

module.exports = {
    addNewOrderAsync,
    getOrderDetailsAsync,
    getOrderFinalPriceAsync,
    getOneOrderAsync,
    getAllOrders
}