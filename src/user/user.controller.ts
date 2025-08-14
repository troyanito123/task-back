import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private userService: UserService) {}

  getByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    const userData = await this.userService.getByEmail(email);
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };
  createUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const createData = await this.userService.createUser(email);
    if (!createData) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    res.status(201).json(createData);
  };
  renew = async (req: Request, res: Response) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    const renewDataToken = await this.userService.renew(token ?? "");
    if (!renewDataToken) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    res.status(200).json(renewDataToken);
  };
}
