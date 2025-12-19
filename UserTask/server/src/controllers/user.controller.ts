import * as express from 'express'
import UserService from '../services/user.service'
import { AuthRequest } from '../middlewares/auth.middleware'

class UserController {
  private service: UserService = new UserService()

  public createUser = async (request: AuthRequest, response: express.Response) => {
    try {
      let newUser = await this.service.createUser(request.body, request.accountId)
      response.status(201).send(newUser)
    } catch (error) {
      response.status(error.status || 500).send(error.message)
    }
  }

  public getAllUsers = async (request: AuthRequest, response: express.Response) => {
    try {
      let users = await this.service.getAllUsers(request.accountId)
      response.send(users)
    } catch (error) {
      response.status(500).send(error.message)
    }
  }

  public getAllUserCity = async (request: AuthRequest, response: express.Response) => {
    try {
      let users = await this.service.getAllUserCity(request.params.id, request.accountId)
      response.send(users)
    } catch (error) {
      response.status(500).send(error.message)
    }
  }

  public deleteUser = async (request: AuthRequest, response: express.Response) => {
    try {
      let deleteResponse = await this.service.deleteUser(request.params.id, request.accountId)
      response.send(deleteResponse)
    } catch (error) {
      response.status(error.status || 500).send(error.message)
    }
  }
}

export default UserController
