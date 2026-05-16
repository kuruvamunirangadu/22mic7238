const Log = require("../utils/logger");

const requestLogger = async (req, res, next) => {
    const startedAt = Date.now();

    res.on("finish", async () => {
        const elapsed = Date.now() - startedAt;
        await Log(
            "backend",
            "info",
            "middleware",
            `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`
        );
    });

    next();
};

module.exports = requestLogger;
