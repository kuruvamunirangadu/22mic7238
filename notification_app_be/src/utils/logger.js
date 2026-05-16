const apiClient = require("../config/apiClient");

const Log = async (stack, level, pkg, message) => {
    try {
        await apiClient.post("/logs", {
            stack,
            level,
            package: pkg,
            message
        });
    } catch (_) {
        // Intentionally avoid console logging per evaluation constraints.
    }
};

module.exports = Log;
