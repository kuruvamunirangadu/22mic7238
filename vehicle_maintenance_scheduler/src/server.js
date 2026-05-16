require("dotenv").config();

const app = require("./app");
const Log = require("./utils/logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await Log("backend", "info", "service", `vehicle_maintenance_scheduler listening on port ${PORT}`);
});
