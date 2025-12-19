import * as express from 'express'
import Routers from '../interfaces/routers-interface'
import TaskController from '../controllers/task.controller'
import { requireAuth } from '../middlewares/auth.middleware'

class TaskRout implements Routers {
  public path = '/task'
  public router = express.Router()
  private controller: TaskController = new TaskController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(this.path, requireAuth, this.controller.create)
    this.router.get(this.path, requireAuth, this.controller.getAll)
    this.router.get(`${this.path}/:id`, requireAuth, this.controller.getTaskByIdUser)
    this.router.patch(`${this.path}/:id`, requireAuth, this.controller.editTask)
    this.router.delete(`${this.path}/:id`, requireAuth, this.controller.delete)
  }
}

export default TaskRout
