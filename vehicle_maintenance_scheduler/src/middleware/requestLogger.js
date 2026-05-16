const Log = require("../utils/logger");

const requestLogger = async (req, res, next) => {
    const start = Date.now();

    res.on("finish", async () => {
        const duration = Date.now() - start;

        await Log(
            "backend",
            "info",
            "middleware",
            `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });

    next();
};

module.exports = requestLogger;
