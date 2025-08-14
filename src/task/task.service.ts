import { TaskCreateDto } from "./task-create.dto";
import { TaskUpdateDto } from "./task-update.dto";

export abstract class TaskService {
  abstract getAll(userId: string): Promise<any[]>;

  abstract create(dto: TaskCreateDto): Promise<any>;

  abstract update(updateDto: TaskUpdateDto): Promise<any>;

  abstract delete(id: string): Promise<any>;
}
