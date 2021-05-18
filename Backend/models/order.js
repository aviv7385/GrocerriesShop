class Order {
    constructor(existingOrder) {
        this.orderId = existingOrder.orderId;
        this.userId = existingOrder.userId;
        this.cartId = existingOrder.cartId;
        this.finalPrice = existingOrder.finalPrice;
        this.shippingCity = existingOrder.shippingCity;
        this.shippingStreet = existingOrder.shippingStreet;
        this.shippingDate = existingOrder.shippingDate;
        this.orderDate = existingOrder.orderDate;
        this.cc4Digits = existingOrder.cc4Digits;
    }
}

module.exports