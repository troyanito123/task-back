import * as functions from "firebase-functions";
import express from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtService } from "../jwt/jwt.service";
import cors from "cors";
const app = express();
app.use(cors({ origin: true }));
const jwtService = new JwtService(
  process.env.JWT_SECRET ?? "",
  process.env.JWT_DURATION ?? "5m"
);
const service = new UserService(jwtService);
const controller = new UserController(service);

app.get("/v1/renew", controller.renew);
app.post("/v1", controller.createUser);
app.get("/v1/:email", controller.getByEmail);

export const endPointUsers = functions.https.onRequest(app);
