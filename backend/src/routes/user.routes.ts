import { upload } from "./../helpers/fileUpload.helper";
import { Router } from "express";
import UserController from "../controllers/users.controller";
import AuthMiddleware from "../middlewares/auth";

const userRoutes = Router();

userRoutes.get("/", AuthMiddleware.validateToken, UserController.getAll);
userRoutes.get("/:id", AuthMiddleware.validateToken, UserController.getById);
userRoutes.post(
  "/create",
  AuthMiddleware.validateToken,
  upload.single("image"),
  UserController.create
);
userRoutes.patch(
  "/:id",
  AuthMiddleware.validateToken,
  upload.single("image"),
  UserController.update
);
userRoutes.delete("/:id", AuthMiddleware.validateToken, UserController.delete);

export default userRoutes;
