import { getRepository } from 'typeorm';
import Task from '../models/task.entity';
import User from '../models/user.entity';
 
class TaskService {
    private taskRepository;
    private userRepository;

    constructor() {
      this.taskRepository = getRepository(Task);
      this.userRepository = getRepository(User);
    }

  public createTask = async (body) => {
    const newTask = this.taskRepository.create(body);
    await this.taskRepository.save(newTask);
    return newTask;
  }
 
  public getAllTasks = async () => {
    const tasks = await this.taskRepository.find({ relations: ["user"] });
    return tasks;
  }
 
  public getTaskByIdUser = async (id: any) => {
    const user = await this.userRepository.findOne(id);
    if (!user) {
         const error: any = new Error(`User with id = ${id} not found.`);
         error.status = 404;
         throw error;
    }
    const task = await this.taskRepository.find({user: user});
    return task;
  }
 
  public editTask = async (id, body) => {
    await this.taskRepository.update(id, body);
    const updatedTask = await this.taskRepository.findOne(id);
    if (updatedTask) {
      return updatedTask;
    } else {
      const error: any = new Error(`Task with id = ${id} not found.`);
      error.status = 404;
      throw error;
    }
  }
 
  public deleteTask = async (id) => {
    const deleteResponse = await this.taskRepository.delete(id);
    if (deleteResponse.affected !== 0) {
      return 'Ok';
    } else {
      const error: any = new Error(`Task with id=${id} not found.`);
      error.status = 404;
      throw error;
    }
  }
}
 
export default TaskService;