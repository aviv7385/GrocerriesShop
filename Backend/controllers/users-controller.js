const usersLogic = require("../business-logic-layer/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const express = require("express");
const router = express.Router();

// GET all users - /api/users
router.get("/", async (request, response) => {
    try {
        const users = await usersLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET one user - /api/users/3
router.get("/:userId", async (request, response) => {
    try {
        const userId = +request.params.userId;
        const user = await usersLogic.getOneUserAsync(userId);
        if (!user) {
            response.status(404).send(`User not found.`);
        }
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router;