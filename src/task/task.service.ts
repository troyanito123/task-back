import "../firebase";
import { getFirestore } from "firebase-admin/firestore";
import { TaskCreateDto } from "./task-create.dto";
import { TaskUpdateDto } from "./task-update.dto";
import { logger } from "firebase-functions";

export class TaskService {
  readonly firestore = getFirestore();

  async getAll(userId: string) {
    const taskDoc = await this.firestore
      .collection("Tasks")
      .where("userId", "==", userId)
      .get();
    return taskDoc.docs.map((doc) => doc.data());
  }

  async create(dto: TaskCreateDto) {
    const id = this.firestore.collection("Tasks").doc().id;
    const data = {
      id,
      userId: dto.userId,
      title: dto.title,
      description: dto.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.firestore.collection("Tasks").doc(id).set(data);
    return data;
  }

  async update(updateDto: TaskUpdateDto) {
    const { id, title, description, completed } = updateDto;
    const taskRef = this.firestore.collection("Tasks").doc(id);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return null;
    }
    const existingData = taskDoc.data();
    logger.warn("Updating task:", updateDto);
    const cleanObj = Object.fromEntries(
      Object.entries({ title, description, completed }).filter(
        (field) => field[1] !== null
      )
    );
    await taskRef.update(cleanObj);
    return { ...existingData, ...cleanObj };
  }

  async delete(id: string) {
    const taskRef = this.firestore.collection("Tasks").doc(id);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return null;
    }
    const taskData = taskDoc.data();
    await taskRef.delete();
    return taskData;
  }
}
