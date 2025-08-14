import * as functions from "firebase-functions";
import express from "express";

import { TaskFirebaseService } from "./task-firebase.service";
import { TaskController } from "./task.controller";
import { UserMiddleware } from "../user/user.middleware";
import { JwtService } from "../jwt/jwt.service";
import { TaskMiddleware } from "./task.middleware";
import cors from "cors";

const app = express();
app.use(cors({ origin: true }));
const jwtService = new JwtService(
  process.env.JWT_SECRET ?? "",
  process.env.JWT_DURATION ?? "5m"
);
const userMiddleware = new UserMiddleware(jwtService);
app.use(userMiddleware.verifyToken);
const service = new TaskFirebaseService();
const controller = new TaskController(service);

app.get("", controller.getAllTasks);
app.post("", TaskMiddleware.validateCreateDto, controller.create);
app.put("/:id", TaskMiddleware.validateUpdateDto, controller.update);
app.delete("/:id", controller.delete);

export const endPointTasks = functions.https.onRequest(app);
