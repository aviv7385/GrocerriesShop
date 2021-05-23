const uuid = require("uuid");
const dal = require("../data-access-layer/dal");

// get all categories
async function getAllCategoriesAsync() {
    const sql = `SELECT * FROM categories`;
    const categories = await dal.executeAsync(sql);
    return categories;
}

// // get one category by category id
// async function getOneCategoryAsync(categoryId) {
//     const sql = `SELECT * FROM categories WHERE categoryId=${categoryId}`;
//     const category = await dal.executeAsync(sql);
//     return category[0];
// }

// get all products
async function getAllProductsAsync() {
    const sql = `SELECT * FROM products`;
    const products = await dal.executeAsync(sql);
    return products;
}

// get all products by category id
async function getAllProductsByCategoryAsync(categoryId) {
    const sql = `SELECT productId, productName, P.categoryId, C.categoryName, price, imageFileName
                FROM products AS P JOIN categories AS C 
                ON P.categoryId=C.categoryId
                WHERE P.categoryId=${categoryId}`;
    const products = await dal.executeAsync(sql);
    return products;
}

// get one product by product id
async function getOneProductAsync(productId) {
    const sql = `SELECT * FROM products WHERE productId=${productId}`;
    const product = await dal.executeAsync(sql);
    return product[0];
}

// add one product (only ADMIN)
async function addOneProductAsync(product, image) {
    // save image to server
    let newFileName = null;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newFileName = uuid.v4() + extension;
        await image.mv("./images/" + newFileName);
    }
    const sql = `INSERT INTO products VALUES(DEFAULT, ?,?,?,?)`;
    const values = [product.categoryId, product.productName, product.price, product.imageFileName];
    const info = await dal.executeAsync(sql, values);
    product.productId = info.insertId;
    product.imageFileName = newFileName;
    return product;
}

// edit a full product (only ADMIN)
async function editFullProductAsync(product, image) {
    // save image to server
    let newFileName = null;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newFileName = uuid.v4() + extension;
        await image.mv("./images/" + newFileName);
    }
    const sql = `UPDATE products SET
                categoryId = ${product.categoryId},
                productName = '${product.productName}',
                price = ${product.price},
                imageFileName = '${product.imageFileName}'
                WHERE productId = ${product.productId}`;
    const info = await dal.executeAsync(sql);
    if (image) {
        product.imageFileName = newFileName;
    }
    return info.affectedRows === 0 ? null : product;
}

// edit a partial product (only ADMIN)
async function editPartialProductAsync(product, image) {
    // save image to server
    let newFileName = null;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newFileName = uuid.v4() + extension;
        await image.mv("./images/" + newFileName);
    }
    const productToUpdate = await getOneProductAsync(product.productId);
    if (!productToUpdate) {
        return null;
    }
    for (const prop in product) {
        if (product[prop] !== undefined) {
            productToUpdate[prop] = product[prop];
        }
    }
    if (image) {
        productToUpdate.imageFileName = newFileName;
    }
    return await editFullProductAsync(productToUpdate);
}


module.exports = {
    getAllProductsAsync,
    getAllProductsByCategoryAsync,
    getAllCategoriesAsync,
    //getOneCategoryAsync,
    getOneProductAsync,
    addOneProductAsync,
    editFullProductAsync,
    editPartialProductAsync
}