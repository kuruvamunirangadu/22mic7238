const express = require("express");
const cors = require("cors");

const requestLogger = require("./middleware/requestLogger");
const routes = require("./routes/notificationRoutes");
const errorHandler = require("./handlers/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Notification backend running" });
});

app.use("/notifications", routes);

app.use(errorHandler);

module.exports = app;
