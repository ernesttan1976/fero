// //this code is from Irvin's repo, for reference only


// import express from "express";
// const router = express.Router();
// import newLaunchesController from "../controllers/newLaunchesController";
// import uploadFileController from "../controllers/uploadFileController";
// import auth from "../controllers/auth";

// router.get("/", newLaunchesController.index);
// router.post("/", auth.isAuth(["Admin"]), newLaunchesController.create);
// router.post(
//   "/gallery",
//   auth.isAuth(["Admin"]),
//   uploadFileController.uploadImage
// );
// router.post(
//   "/sitefloorplans",
//   auth.isAuth(["Admin"]),
//   uploadFileController.uploadImage
// );
// router.post(
//   "/availabilityPrice",
//   auth.isAuth(["Admin"]),
//   uploadFileController.uploadImage
// );
// router.put("/:id", auth.isAuth(["Admin"]), newLaunchesController.update);
// router.get("/:id", newLaunchesController.show);
// router.delete("/:id", auth.isAuth(["Admin"]), newLaunchesController.delete);

// module.exports = router;