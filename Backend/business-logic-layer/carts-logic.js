const dal = require("../data-access-layer/dal");

// create new cart
async function addNewCartAsync(cart) {
    const sql = `INSERT INTO shoppingcarts VALUES(DEFAULT, ?,?)`;
    const values = [cart.userId, cart.date];
    const info = await dal.executeAsync(sql, values);
    cart.cartId = info.insertId;
    return cart;
}

// add new item to the cart
async function addNewItemAsync(item) {
    const sql = `INSERT INTO cartitems VALUES(DEFAULT, ?, ?, ?, ?)`;
    const values = [item.itemId, item.productId, item.cartId, item.quantity, item.totalPrice];
    const info = await dal.executeAsync(sql, values);
    item.itemId = info.insertId;
    return item;
}

// display all cart items 
async function getAllCartItemsAsync(cartId) {
    const sql = `SELECT P.productName, P.price, P.imageFileName, C.cartId, C.quantity, C.totalPrice 
                FROM cartitems AS C JOIN products AS P
                ON C.productId=P.productId
                WHERE C.cartId=${cartId}`;
    const cartItems = await dal.executeAsync(sql);
    return cartItems;
}

// get the total price of all items in a cart
async function getTotalPriceAsync(cartId) {
    const sql = `SELECT SUM(totalPrice) AS totalCartPrice
                FROM cartitems WHERE cartId=${cartId}`;
    const totalCartPrice = await dal.executeAsync(sql);
    return totalCartPrice;
}



module.exports = {
    addNewCartAsync,
    addNewItemAsync,
    getAllCartItemsAsync,
    getTotalPriceAsync
}