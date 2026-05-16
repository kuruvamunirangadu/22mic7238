require("dotenv").config();

const apiClient = require("../src/config/apiClient");
const { knapsack } = require("../src/services/schedulerService");

const formatRows = (tasks) => tasks.map((task, index) => ({
    "#": index + 1,
    TaskID: task.TaskID,
    Duration: task.Duration,
    Impact: task.Impact
}));

const main = async () => {
    const depotsRes = await apiClient.get("/depots");
    const vehiclesRes = await apiClient.get("/vehicles");

    const depots = depotsRes.data.depots || [];
    const vehicles = vehiclesRes.data.vehicles || [];

    console.log("================ SCHEDULING RESULTS ================");
    console.log(`Depots loaded: ${depots.length}`);
    console.log(`Vehicles loaded: ${vehicles.length}`);
    console.log("");

    for (const depot of depots) {
        const optimized = knapsack(vehicles, depot.MechanicHours);

        console.log(`Depot ${depot.ID}`);
        console.log(`Max achievable Operational Impact: ${optimized.maxImpact}`);
        console.log(`Time utilized: ${optimized.selectedTasks.reduce((sum, task) => sum + task.Duration, 0)} / ${depot.MechanicHours} hours`);
        console.log(`Total Vehicles Serviced: ${optimized.selectedTasks.length}`);
        console.table(formatRows(optimized.selectedTasks));
        console.log("");
    }
};

main().catch((error) => {
    console.error("Failed to generate schedule report:", error.message);
    process.exit(1);
});