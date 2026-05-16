require("dotenv").config();

const app = require("./app");
const Log = require("./utils/logger");

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    await Log("backend", "info", "service", `notification_app_be listening on port ${PORT}`);
});
