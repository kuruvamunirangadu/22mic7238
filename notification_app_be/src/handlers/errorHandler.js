const Log = require("../utils/logger");

const errorHandler = async (err, req, res, next) => {
    await Log("backend", "error", "handler", err.message || "Unexpected error");

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;
