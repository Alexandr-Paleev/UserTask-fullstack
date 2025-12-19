import * as express from 'express'
import Routers from '../interfaces/routers-interface'
import AuthController from '../controllers/auth.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { authLoginLimiter } from '../middlewares/rateLimit.middleware'

class AuthRout implements Routers {
  public path = '/auth'
  public router = express.Router()
  private controller: AuthController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.controller.register)
    this.router.post(`${this.path}/login`, authLoginLimiter, this.controller.login)
    this.router.get(`${this.path}/me`, requireAuth, this.controller.me)
  }
}

export default AuthRout
