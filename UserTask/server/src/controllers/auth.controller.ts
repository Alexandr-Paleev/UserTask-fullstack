import * as express from 'express'
import AuthService from '../services/auth.service'
import { AuthRequest } from '../middlewares/auth.middleware'

class AuthController {
  private service: AuthService = new AuthService()

  public register = async (request: express.Request, response: express.Response) => {
    try {
      const { email, password } = request.body || {}
      if (!email || !password) {
        return response.status(400).send('email and password are required')
      }
      const result = await this.service.register(email, password)
      return response.status(201).send(result)
    } catch (error) {
      return response.status(error.status || 500).send(error.message)
    }
  }

  public login = async (request: express.Request, response: express.Response) => {
    try {
      const { email, password } = request.body || {}
      if (!email || !password) {
        return response.status(400).send('email and password are required')
      }
      const result = await this.service.login(email, password)
      return response.send(result)
    } catch (error) {
      return response.status(error.status || 500).send(error.message)
    }
  }

  public me = async (request: AuthRequest, response: express.Response) => {
    return response.send({ accountId: request.accountId })
  }
}

export default AuthController
