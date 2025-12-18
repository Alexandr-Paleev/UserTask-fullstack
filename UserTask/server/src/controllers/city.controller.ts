import * as express from 'express';
import CityService from '../services/city.service';


class CityController {
    private service: CityService = new CityService();

  public create = async (request: express.Request, response: express.Response) => {
    try {
      let newUser = await this.service.createCity(request.body);
      response.status(201).send(newUser);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
 
  public getAll = async (request: express.Request, response: express.Response) => {
    try {
      let projects = await this.service.getAllCitys();
      response.send(projects);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
 
  public delete = async (request: express.Request, response: express.Response) => {
    try {
      let deleteResponse = await this.service.deleteCity(request.params.id);
      response.send(deleteResponse);
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  }
}
 
export default CityController;