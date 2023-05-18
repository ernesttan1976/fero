const express = require("express");
const courseController = require("../controllers/coursesController");

const router = express.Router();

// start from /courses
router.get("/seed", courseController.seed);
router.get("/", courseController.index);
router.post("/", courseController.create);
router.get("/:id", courseController.show);
router.get("/nocache/:id", courseController.showNoCache);
router.delete("/:id", courseController.delete);
router.put("/:id", courseController.update);
router.patch("/:id", courseController.updatePatch);

module.exports = router;
