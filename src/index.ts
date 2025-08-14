import { endPointTasks } from "./task/task.route";
import { endPointUsers } from "./user/user.route";

export const users = { service: endPointUsers };
export const tasks = { service: endPointTasks };
