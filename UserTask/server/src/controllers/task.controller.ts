import * as express from 'express';
import TaskService from '../services/task.service';


class TaskController {
    private service: TaskService = new TaskService();

  public create = async (request: express.Request, response: express.Response) => {
    try {
      let newTask = await this.service.createTask(request.body);
      response.status(201).send(newTask);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
 
  public getAll = async (request: express.Request, response: express.Response) => {
    try {
      let tasks = await this.service.getAllTasks();
      response.send(tasks);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
 
  public getTaskByIdUser = async (request: express.Request, response: express.Response) => {
    try {
      let task = await this.service.getTaskByIdUser(request.params.id);
      response.send(task);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
 
  public editTask = async (request: express.Request, response: express.Response) => {
    try {
      let updatedTask = await this.service.editTask(request.params.id, request.body);
      response.send(updatedTask);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
 
  public delete = async (request: express.Request, response: express.Response) => {
    try {
      let deleteResponse = await this.service.deleteTask(request.params.id);
      response.send(deleteResponse);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
}
 
export default TaskController;