const express = require("express");
const router = express.Router();

const { api } = require("../controllers/api.controller");

router.get("/:api_key", api);

module.exports = router;
