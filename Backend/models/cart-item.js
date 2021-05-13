class CartItem {
    constructor(existingCartItem) {
        this.itemId = existingCartItem.itemId;
        this.productId = existingCartItem.productId;
        this.cartId = existingCartItem.cartId;
        this.quantity = existingCartItem.quantity;
        this.totalPrice = existingCartItem.totalPrice;
    }
}

module.exports = CartItem;