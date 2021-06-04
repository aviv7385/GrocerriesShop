const dal = require("../data-access-layer/dal");

// create new cart
async function addNewCartAsync(cart) {
    const sql = `INSERT INTO shoppingcarts VALUES(DEFAULT, ?,?, DEFAULT)`;
    const values = [cart.userId, cart.date];
    const info = await dal.executeAsync(sql, values);
    cart.cartId = info.insertId;
    return cart;
}

// get all shopping carts
async function getAllShoppingCartsAsync() {
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
async function checkIfItemInCartAsync(productId, cartId) {
    const sql = `SELECT * FROM cartitems WHERE productId=${productId} AND cartId=${cartId}`;
    const isItemInCart = await dal.executeAsync(sql);
    return isItemInCart;
}

// get all cart items 
async function getAllCartItemsAsync(cartId) {
    const sql = `SELECT C.itemId, P.productName, P.price, P.imageFileName, C.cartId, C.quantity, (C.quantity*P.price) AS totalPrice 
                FROM cartitems AS C JOIN products AS P
                ON C.productId=P.productId
                WHERE C.cartId=${cartId}`;
    const cartItems = await dal.executeAsync(sql);
    return cartItems;
}

// get one cart item
async function getOneCartItemAsync(itemId) {
    const sql = `SELECT P.productName, P.price, P.imageFileName, C.cartId, C.quantity, (C.quantity*P.price) AS totalPrice 
                FROM cartitems AS C JOIN products AS P
                ON C.productId=P.productId
                WHERE C.itemId=${itemId}`;
    const oneItem = await dal.executeAsync(sql);
    return oneItem;
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
async function deleteCartItemAsync(itemId) {
    const sql = `DELETE FROM cartitems WHERE itemId=${itemId}`;
    await dal.executeAsync(sql);
}

// delete all items from a cart
async function deleteAllItemsFromACartAsync(cartId) {
    const sql = `DELETE FROM cartitems WHERE cartId=${cartId}`;
    await dal.executeAsync(sql);
}

// delete entire shopping cart
async function deleteEntireShoppingCart(cartId) {
    const sql = `DELETE FROM shoppingcarts WHERE cartId=${cartId}`;
    await dal.executeAsync(sql);
}

// partial update - change the quantity of a specific item in a specific cart
async function updateQuantityOfItem(item) {
    const sql = `UPDATE cartitems SET quantity=${item.quantity} WHERE itemId=${item.itemId}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : item;
}

// partial update - change the isOrdered from false to true, once an order was made to that cart 
async function isOrderedAsync(shoppingCart){
    const sql = `UPDATE shoppingcarts SET isOrdered=1 WHERE cartId=${shoppingCart.cartId}`;
    const info = await  dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : shoppingCart;
}

// check if user 

module.exports = {
    addNewCartAsync,
    addNewItemAsync,
    getAllCartItemsAsync,
    getTotalPriceAsync,
    deleteCartItemAsync,
    updateQuantityOfItem,
    getAllShoppingCartsAsync,
    checkIfItemInCartAsync,
    getOneCartItemAsync,
    deleteAllItemsFromACartAsync,
    deleteEntireShoppingCart,
    isOrderedAsync
}