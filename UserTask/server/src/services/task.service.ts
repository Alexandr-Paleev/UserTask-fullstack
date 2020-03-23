import * as express from 'express';
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
    const tasks = await this.taskRepository.find();
    return tasks;
  }
 
  public getTaskByIdUser = async (id: any) => {
    const user = await this.userRepository.findOne(id);
    const task = await this.taskRepository.find({user_: user});
    if (task.length !== 0) {
      return task;
    } else {
      // next(new TaskNotFoundException(id));
      return `User with id = ${id} not found.`;
    }
  }
 
  public editTask = async (id, body) => {
    await this.taskRepository.update(id, body);
    const updatedTask = await this.taskRepository.findOne(id);
    if (updatedTask) {
      return updatedTask;
    } else {
      // next(new TaskNotFoundException(id));
      return `Task with id = ${id} not found.`;
    }
  }
 
  public deleteTask = async (id) => {
    const deleteResponse = await this.taskRepository.delete(id);
    if (deleteResponse.affected !== 0) {
      return 'Ok';
    } else {
      // next(new TaskNotFoundException(id));
      return `Task with id=${id} not found.`;
    }
  }
}
 
export default TaskService;