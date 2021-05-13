const dal = require("../data-access-layer/dal");

// get all users
async function getAllUsersAsync() {
    const sql = `SELECT userId, uuid, idNumber, email, firstName, lastName, C.city, street, isAdmin 
                FROM users AS U JOIN cities AS C
                ON C.cityId = U.cityId`;
    const users = await dal.executeAsync(sql);
    return users;
}

// get one user
async function getOneUserAsync(uuid) {
    const sql = `SELECT userId, uuid, idNumber, email, firstName, lastName, C.city, street, isAdmin 
                FROM users AS U JOIN cities AS C
                ON C.cityId = U.cityId
                WHERE uuid = '${uuid}'`;
    const users = await dal.executeAsync(sql);
    return users[0];
}

// check if idNumber exists
async function checkIdNumberAsync(idNumber) {
    const sql = `SELECT idNumber FROM users WHERE idNumber = '${idNumber}'`;
    const isIdNumber = await dal.executeAsync(sql);
    return isIdNumber;
}



module.exports = {
    getAllUsersAsync,
    getOneUserAsync,
    checkIdNumberAsync
}