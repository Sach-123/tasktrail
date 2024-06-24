import { Router } from "express";
import {
  checkLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addTask,
  allTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

//user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/check-login").post(verifyJWT, checkLogin);

//task routes
router.route("/tasks").post(verifyJWT, allTask);
router.route("/add-task").post(verifyJWT, addTask);
router.route("/update-tasks/:taskId").patch(verifyJWT, updateTask);
router.route("/delete-tasks/:taskId").get(verifyJWT, deleteTask);
export default router;
