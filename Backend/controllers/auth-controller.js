const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const router = express.Router();
const errorsHelper = require("../helpers/errors-helper");

// POST - register new user - first step - "api/auth/register" (access allowed to any user)
router.post("/register", async (request, response) => {
    try {
        // check if id number exists
        const isIdNumber = await usersLogic.checkIdNumberAsync(request.body.idNumber);
        // if id number does not exist in the system - proceed to register
        if (isIdNumber.length === 0) {
            const newUser = await authLogic.registerStep1Async(request.body);
            response.status(201).json(newUser);
        }
        else {
            response.status(400).send("Id number is already in the system, please log in.");
        }
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// PATCH - update user details - second step of registration ("api/auth/register/3")
router.patch("/register/:userId", async (request, response) => {
    try {
        const userDetails = request.body;
        const userId = +request.params.userId;
        const updatedUser = await authLogic.registerStep2Async(userId, userDetails);
        if (!updatedUser){
            response.status(404).send(`user not found.`);
            return;
        }
        response.json(updatedUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


// POST - login existing user - "api/auth/login" (access allowed to any user)
router.post("/login", async (request, response) => {
    try {
        const loggedInUser = await authLogic.loginAsync(request.body);
        if (!loggedInUser) {
            return response.status(401).send("Incorrect email or password, please try again or register");
        }
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


// GET all cities - api/auth/cities
router.get("/cities", async (request, response) => {
    try {
        const cities = await authLogic.getAllCitiesAsync();
        response.json(cities);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;