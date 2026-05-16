const express = require("express");
const cors = require("cors");

const requestLogger = require("./middleware/requestLogger");
const schedulerRoutes = require("./routes/schedulerRoutes");
const errorHandler = require("./handlers/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/schedule", schedulerRoutes);

app.use(errorHandler);

module.exports = app;
