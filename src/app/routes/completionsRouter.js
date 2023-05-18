const express = require("express");
const completionController = require("../controllers/completionsController");

const router = express.Router();

// start from /courses
router.get("/", completionController.index);
router.post("/", completionController.create);
router.get("/:id", completionController.show);
router.delete("/:id", completionController.delete);
router.put("/:id", completionController.update);

module.exports = router;
