const apiClient = require("../config/apiClient");
const Log = require("../utils/logger");
const { knapsack } = require("../services/schedulerService");

const getSchedule = async (req, res, next) => {
    try {
        await Log(
            "backend",
            "info",
            "service",
            "Fetching depots and vehicles"
        );

        const depotsRes = await apiClient.get("/depots");
        const vehiclesRes = await apiClient.get("/vehicles");

        const depots = depotsRes.data.depots || [];
        const vehicles = vehiclesRes.data.vehicles || [];

        await Log(
            "backend",
            "info",
            "service",
            `Found ${depots.length} depots and ${vehicles.length} vehicles`
        );

        const result = [];

        for (const depot of depots) {
            const optimized = knapsack(vehicles, depot.MechanicHours);

            result.push({
                depotId: depot.ID,
                mechanicHours: depot.MechanicHours,
                totalImpact: optimized.maxImpact,
                selectedTasks: optimized.selectedTasks,
                taskCount: optimized.selectedTasks.length
            });

            await Log(
                "backend",
                "info",
                "service",
                `Scheduled ${optimized.selectedTasks.length} tasks for depot ${depot.ID} with impact ${optimized.maxImpact}`
            );
        }

        res.status(200).json({
            success: true,
            data: result,
            totalDepots: result.length
        });

    } catch (err) {
        await Log(
            "backend",
            "error",
            "service",
            `Error fetching schedule: ${err.message}`
        );
        next(err);
    }
};

module.exports = {
    getSchedule
};
