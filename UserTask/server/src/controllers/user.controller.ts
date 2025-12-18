import * as express from 'express';
import UserService from '../services/user.service';


class UserController {
    private service: UserService = new UserService();

  public createUser = async (request: express.Request, response: express.Response) => {
    try {
      let newUser = await this.service.createUser(request.body);
      response.status(201).send(newUser);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
 
  public getAllUsers = async (request: express.Request, response: express.Response) => {
    try {
      let users = await this.service.getAllUsers();
      response.send(users);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
 
  public getAllUserCity = async (request: express.Request, response: express.Response) => {
    try {
      let user = await this.service.getAllUserCity(request.params.id);
      response.send(user);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
 
  public deleteUser = async (request: express.Request, response: express.Response) => {
    try {
      let deleteResponse = await this.service.deleteUser(request.params.id);
      response.send(deleteResponse);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
}
 
export default UserController;