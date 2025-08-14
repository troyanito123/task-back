import { NextFunction, Request, Response } from "express";
import { TaskCreateDto } from "./task-create.dto";
import { TaskUpdateDto } from "./task-update.dto";
export class TaskMiddleware {
  static async validateCreateDto(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [error, task] = TaskCreateDto.create({
      userId: req.body.user.id,
      title: req.body.title,
      description: req.body.description,
    });
    if (task) {
      req.body.dto = task;
      next();
    } else {
      res.status(400).json({ error });
    }
  }

  static async validateUpdateDto(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const [error, task] = TaskUpdateDto.create({
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });
    if (task) {
      req.body.dto = task;
      next();
    } else {
      res.status(400).json({ error });
    }
  }
}
