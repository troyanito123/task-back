import { Request, Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  constructor(private taskService: TaskService) {}

  getAllTasks = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAll(req.body.user.id);
    res.status(200).json(tasks);
  };
  create = async (req: Request, res: Response) => {
    const createDto = req.body.dto;
    const newTask = await this.taskService.create(createDto);
    res.status(201).json(newTask);
    return;
  };
  update = async (req: Request, res: Response) => {
    const updateDto = req.body.dto;
    const updatedTask = await this.taskService.update(updateDto);
    if (updatedTask) {
      res.status(200).json(updatedTask);
      return;
    }
    res
      .status(404)
      .json({ message: `Task with id: ${updateDto.id} not found` });
    return;
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }
    const deletedTask = await this.taskService.delete(id);
    res.status(200).json(deletedTask);
  };
}
