import * as express from 'express';
import CityService from '../services/city.service';


class CityController {
    private service: CityService = new CityService();

  public create = async (request: express.Request, response: express.Response) => {
    let newUser = await this.service.createCity(request.body);
    response.send(newUser);
  }
 
  public getAll = async (request: express.Request, response: express.Response) => {
    let projects = await this.service.getAllCitys();
    response.send(projects);
  }
 
  public delete = async (request: express.Request, response: express.Response) => {
    let deleteResponse = await this.service.deleteCity(request.params.id);
    response.send(deleteResponse);
  }
}
 
export default CityController;