import Router from "express";
import controller from "./Controllers/authController.js";
import courseController from "./Controllers/courseController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import paymentController from "./Controllers/paymentController.js";
import adminMiddleware from "./Middleware/adminMiddleware.js";
import EcommpayController from "./Controllers/ecommpayController.js";

import { check, body } from "express-validator";
import authController from "./Controllers/authController.js";

const router = new Router();

/**
 * AUTHORIZATION
 */
router.post(
  "/registration",

  check("username", "Name-field cant be empty").notEmpty(),
  check("password", "Password-field cant be empty").isLength({
    min: 8,
    max: 12,
  }),
  body("email").isEmail(),

  controller.registration
);

router.get("/activate/:link", controller.activate);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/refresh", controller.refresh);
router.get("/users", authMiddleware, controller.getUsers);

/**
 * ADMIN API
 */
//router.post("/admin/course/create", adminMiddleware, courseController.create);
/*router.post(
  "/admin/course/steps",
  adminMiddleware,
  courseController.createStep
);*/
/**
 * Payment API
 */
router.post("/payment", EcommpayController.paymentCreate);
router.post("/payment/callback", EcommpayController.paymnetCallback);
router.post("/create-payment-intent", paymentController.paymentCreate);
router.post("/create-payment-intent/activate-user", controller.activateUser);
router.post("/stripe-webhook", express.json({ type: "application/json" }));
/***
 * TECT
 */
router.post("/test/admin/course/create/", courseController.create);
router.post(
  "/test/admin/course/create-description",
  courseController.createCourseDescription
);
/**
 * USER API
 */
router.post(
  "/user-information",
  authMiddleware,
  authController.getUserInformation
);
router.get("/course/all", authMiddleware, courseController.getCourses);
router.post(
  "/course/description",
  authMiddleware,
  courseController.getCourseDescription
);
router.post("/course/lessons", authMiddleware, courseController.getLessons);
router.post("/course/steps", authMiddleware, courseController.getSteps);
router.post("/course/one-step", authMiddleware, courseController.getOneStep);

router.post("/course/progress/create", courseController.createProgress);
router.post("/course/progress/post", courseController.postProgress);
router.post(
  "/course/progress/get/lessons",
  courseController.getProgressLessons
);
router.post("/course/progress/get/steps", courseController.getProgressSteps);

router.get("/test", (req, res) => {
  return res.status(200).json({ message: "fucked you up" });
});
/////////////////////////
/*router.post(
  "/course/personal",
  authMiddleware,
  courseController.getPersonalCourse
);
router.post(
  "/course/personal/postPropgress",
  authMiddleware,
  courseController.postProgress
);
router.post(
  "/course/personal/getPropgress",
  authMiddleware,
  courseController.getProgress
);*/

export default router;
