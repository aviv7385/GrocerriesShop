const dal = require("../data-access-layer/dal");
const cartsLogic = require("./carts-logic");

// add new order
async function addNewOrderAsync(order) {
    const sql = `INSERT INTO orders(orderId, userId, cartId, shippingCity, shippingStreet, shippingDate, orderDate, cc4Digits) 
                VALUES(DEFAULT, ?, ?, ?, ?, ?, DEFAULT, RIGHT(${order.cc4Digits}, 4))`;
    const values = [order.userId, order.cartId, order.shippingCity,
    order.shippingStreet, order.shippingDate];
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

module.exports = {
    addNewOrderAsync
}