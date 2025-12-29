import * as express from 'express'
import TaskService from '../services/task.service'
import { AuthRequest } from '../middlewares/auth.middleware'

class TaskController {
  private service: TaskService = new TaskService()

  public create = async (request: AuthRequest, response: express.Response) => {
    try {
      let newTask = await this.service.createTask(request.body, request.accountId)
      response.status(201).send(newTask)
    } catch (error) {
      response.status(error.status || 500).send(error.message)
    }
  }

  public getAll = async (request: AuthRequest, response: express.Response) => {
    try {
      const page = Number(request.query.page) || 1
      const limit = Number(request.query.limit) || 10
      let result = await this.service.getAllTasks(request.accountId, page, limit)
      response.send(result)
    } catch (error) {
      response.status(500).send(error.message)
    }
  }

  public getTaskByIdUser = async (request: AuthRequest, response: express.Response) => {
    try {
      let task = await this.service.getTaskByIdUser(request.params.id, request.accountId)
      response.send(task)
    } catch (error) {
      response.status(error.status || 500).send(error.message)
    }
  }

  public editTask = async (request: AuthRequest, response: express.Response) => {
    try {
      let updatedTask = await this.service.editTask(
        request.params.id,
        request.body,
        request.accountId,
      )
      response.send(updatedTask)
    } catch (error) {
      response.status(error.status || 500).send(error.message)
    }
  }

  public delete = async (request: AuthRequest, response: express.Response) => {
    try {
      let deleteResponse = await this.service.deleteTask(request.params.id, request.accountId)
      response.send(deleteResponse)
    } catch (error) {
      response.status(error.status || 500).send(error.message)
    }
  }
}

export default TaskController
