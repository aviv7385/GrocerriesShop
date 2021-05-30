const dal = require("../data-access-layer/dal");

// create new cart
async function addNewCartAsync(cart) {
    const sql = `INSERT INTO shoppingcarts VALUES(DEFAULT, ?,?)`;
    const values = [cart.userId, cart.date];
    console.log(values);
    const info = await dal.executeAsync(sql, values);
    cart.cartId = info.insertId;
    return cart;
}

// get all shopping carts
async function getAllShoppingCartsAsync(){
    const sql = `SELECT * FROM shoppingcarts`;
    const shoppingCarts = await dal.executeAsync(sql);
    return shoppingCarts;
}

// add new item to the cart
async function addNewItemAsync(item) {
    const sql = `INSERT INTO cartitems VALUES(DEFAULT, ?, ?, ?)`;
    const values = [item.productId, item.cartId, item.quantity];
    const info = await dal.executeAsync(sql, values);
    item.itemId = info.insertId;
    return item;
}

// check if item is already in the cart
async function checkIfItemInCartAsync(productId, cartId){
    const sql = `SELECT * FROM cartitems WHERE productId=${productId} AND cartId=${cartId}`;
    const isItemInCart = await dal.executeAsync(sql);
    return isItemInCart;
}

// get all cart items 
async function getAllCartItemsAsync(cartId) {
    const sql = `SELECT P.productName, P.price, P.imageFileName, C.cartId, C.quantity, (C.quantity*P.price) AS totalPrice 
                FROM cartitems AS C JOIN products AS P
                ON C.productId=P.productId
                WHERE C.cartId=${cartId}`;
    const cartItems = await dal.executeAsync(sql);
    return cartItems;
}

// get the total price of all items in a cart
async function getTotalPriceAsync(cartId) {
    const sql = `SELECT SUM(C.quantity*P.price) AS totalCartPrice
                FROM cartitems AS C JOIN products AS P 
                ON C.productId=P.productId
                WHERE cartId=${cartId}`;
    const totalCartPrice = await dal.executeAsync(sql);
    return totalCartPrice[0];
}

// delete an item from a cart
async function deleteCartItemAsync(cartId, itemId) {
    const sql = `DELETE FROM cartitems WHERE cartId=${cartId} AND itemId=${itemId}`;
    await dal.executeAsync(sql);
}

// partial update - change the quantity of a specific item in a specific cart
async function updateQuantityOfItem(item) {
    const sql = `UPDATE cartitems SET quantity=${item.quantity} WHERE itemId=${item.itemId}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : item;
}

module.exports = {
    addNewCartAsync,
    addNewItemAsync,
    getAllCartItemsAsync,
    getTotalPriceAsync,
    deleteCartItemAsync,
    updateQuantityOfItem,
    getAllShoppingCartsAsync,
    checkIfItemInCartAsync
}