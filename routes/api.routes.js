const express = require("express");
const router = express.Router();

const { api } = require("../controllers/api.controller");

/**
 * @swagger
 * /{api_key}:
 *   get:
 *     tags:
 *       - API
 *     description: Get API data
 *     parameters:
 *       - name: api_key
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:api_key", api);

module.exports = router;

module.exports = router;
