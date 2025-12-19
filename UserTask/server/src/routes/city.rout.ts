import * as express from 'express'
import Routers from '../interfaces/routers-interface'
import CityController from '../controllers/city.controller'

class CityRout implements Routers {
  public path = '/city'
  public router = express.Router()
  private controll: CityController = new CityController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(this.path, this.controll.create)
    this.router.get(this.path, this.controll.getAll)
    this.router.delete(`${this.path}/:id`, this.controll.delete)
  }
}

export default CityRout
