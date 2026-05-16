const apiClient = require("../config/apiClient");
const Log = require("../utils/logger");
const { getTopTenNotifications } = require("../services/priorityService");

const listNotifications = async (req, res, next) => {
    try {
        await Log("backend", "info", "route", "Fetching notifications list");
        const response = await apiClient.get("/notifications");

        res.status(200).json({
            success: true,
            count: (response.data.notifications || []).length,
            notifications: response.data.notifications || []
        });
    } catch (err) {
        await Log("backend", "error", "handler", `List notifications failed: ${err.message}`);
        next(err);
    }
};

const getTopTen = async (req, res, next) => {
    try {
        const topTen = await getTopTenNotifications();

        res.status(200).json({
            success: true,
            count: topTen.length,
            notifications: topTen
        });
    } catch (err) {
        await Log("backend", "error", "handler", `Top-10 notifications failed: ${err.message}`);
        next(err);
    }
};

module.exports = {
    listNotifications,
    getTopTen
};
