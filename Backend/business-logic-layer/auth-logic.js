const uuid = require("uuid");
const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");


// register - add new user (access allowed to any user)
async function registerAsync(user) {
    // Hash user password: 
    user.password = cryptoHelper.hash(user.password);

    // create uuid for that user
    user.uuid = uuid.v4();

    const sql = `INSERT INTO users  
                VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, DEFAULT)`;
    const values = [user.idNumber, user.uuid, user.firstName, user.lastName, user.username, user.password, user.city, user.street];
    const info = await dal.executeAsync(sql, values);
    user.userId = info.insertId;

    // Delete the password: 
    delete user.password;

    // Generate JWT token to return to frontend:
    user.token = jwtHelper.getNewToken({ user });

    return user;
}

// login - get one user (access allowed to any user)
async function loginAsync(credentials) {

    // Hash user password: 
    credentials.password = cryptoHelper.hash(credentials.password);

    const sql = `SELECT userId, uuid, idNumber, firstName, lastName, username, city, street, isAdmin FROM users 
                WHERE username = ? AND password = ?`;
    const values = [credentials.username, credentials.password];
    const users = await dal.executeAsync(sql, values);
    if (users.length === 0) {
        return null;
    }
    const user = users[0];

    // Generate JWT token to return to frontend:
    user.token = jwtHelper.getNewToken({ user });
    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};