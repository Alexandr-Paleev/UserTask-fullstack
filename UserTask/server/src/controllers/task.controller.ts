import * as express from 'express';
import TaskService from '../services/task.service';


class TaskController {
    private service: TaskService = new TaskService();

  public create = async (request: express.Request, response: express.Response) => {
    let newTask = await this.service.createTask(request.body);
    response.send(newTask);
  }
 
  public getAll = async (request: express.Request, response: express.Response) => {
    let tasks = await this.service.getAllTasks();
    response.send(tasks);
  }
 
  public getTaskByIdUser = async (request: express.Request, response: express.Response) => {
    let task = await this.service.getTaskByIdUser(request.params.id);
    response.send(task);
  }
 
  public editTask = async (request: express.Request, response: express.Response) => {
    let updatedTask = await this.service.editTask(request.params.id, request.body);
    response.send(updatedTask);
  }
 
  public delete = async (request: express.Request, response: express.Response) => {
    let deleteResponse = await this.service.deleteTask(request.params.id);
    response.send(deleteResponse);
  }
}
 
export default TaskController;