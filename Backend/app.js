global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const productsController = require("./controllers/products-controller");

const server = express(); // Create the entire server.

server.use(express.json()); // Create "body" property from the given JSON.

server.use(fileUpload());

// enable CORS to all clients
server.use(cors());

server.use("/api/products", productsController);


server.use("*", (request, response) => {
    response.status(404).send("Route not found");
});

server.listen(3001, () => console.log("listening..."));