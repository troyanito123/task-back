import { NextFunction, Request, Response } from "express";
import { JwtService } from "../jwt/jwt.service";

export class UserMiddleware {
  constructor(readonly jwtService: JwtService) {}

  verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = this.jwtService.verify(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.body.user = decoded;
    next();
    return;
  };
}
