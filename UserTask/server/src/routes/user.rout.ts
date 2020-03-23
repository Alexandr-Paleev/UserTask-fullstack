import * as express from 'express';
import Routers from '../interfaces/routers-interface'
import UserController from '../controllers/user.controller';

class UsersRout implements Routers {
  public path = '/user';
  public userCity = '/user-city';
  public router = express.Router();
  private controller: UserController = new UserController();
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(this.path, this.controller.createUser);
    this.router.get(this.path, this.controller.getAllUsers);
    this.router.get(`${this.userCity}/:id`,  this.controller.getAllUserCity);
    this.router.delete(`${this.path}/:id`, this.controller.deleteUser);
  }
}

export default UsersRout;