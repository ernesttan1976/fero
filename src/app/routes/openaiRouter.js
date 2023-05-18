const openaiController = require("../controllers/openaiController");
const express = require("express");
const router = express.Router();

function noCache(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
}
router.get("/:id", noCache, openaiController.getMessages);
router.post("/:id", noCache, openaiController.postMessage);
router.post("/openai/:id", noCache, openaiController.postMessageToBotVer2);

module.exports = router;
