import { logger } from "firebase-functions";

export class TaskUpdateDto {
  private constructor(
    readonly id: string,
    readonly title: string | null,
    readonly description: string | null,
    readonly completed: boolean | null
  ) {}

  static create(body: {
    [key: string]: string;
  }): [string | null, TaskUpdateDto?] {
    logger.warn("Creating TaskUpdateDto from body:", body);
    const { id, title, description, completed } = body;
    if (!id) return ["id is required"];

    const completedFormat =
      typeof completed === "string" ? completed === "true" : completed;
    return [
      null,
      new TaskUpdateDto(
        id,
        title ?? null,
        description ?? null,
        completedFormat ?? null,
      ),
    ];
  }
}
