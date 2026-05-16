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
        // Intentionally silent to avoid recursive logging loops.
    }
};

module.exports = Log;
