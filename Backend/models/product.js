class Product {
    constructor(existingProduct) {
        this.productId = existingProduct.productId;
        this.categoryId = existingProduct.categoryId;
        this.productName = existingProduct.productName;
        this.price = existingProduct.price;
        this.imageFileName = existingProduct.imageFileName;
    }
}

module.exports = Product;