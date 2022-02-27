const express = require("express");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());

// Route imports
const product = require("./routes/productRoute");

app.use("/api/v1.0", product);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
