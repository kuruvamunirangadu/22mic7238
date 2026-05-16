const express = require("express");

const { listNotifications, getTopTen } = require("../controllers/notificationController");

const router = express.Router();

router.get("/", listNotifications);
router.get("/priority/top10", getTopTen);

module.exports = router;
