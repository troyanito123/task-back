export class TaskCreateDto {
  private constructor(
    readonly userId: string,
    readonly title: string,
    readonly description: string
  ) {}

  static create(body: {
    [key: string]: string;
  }): [string | null, TaskCreateDto?] {
    const { userId, title, description } = body;
    if (!userId) return ["userId is required"];
    if (!title) return ["title is required"];
    if (!description) return ["description is required"];
    return [null, new TaskCreateDto(userId, title, description)];
  }
}
