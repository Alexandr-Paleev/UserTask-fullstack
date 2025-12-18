import * as express from 'express';
import { getRepository } from 'typeorm';
import City from '../models/city.entity';

class CityService {
  private cityRepository;

  constructor() {
    this.cityRepository = getRepository(City);
  }

  public createCity = async (cityData) => {
    const newCity = this.cityRepository.create(cityData);
    await this.cityRepository.save(newCity);
    return newCity;
  }

  public getAllCitys = async () => {
    const citys = await this.cityRepository.find();
    return citys;
  }
 
  public deleteCity = async (id) => {
    const deleteResponse = await this.cityRepository.delete(id);
    if (deleteResponse.affected !== 0) {
      return 'Ok';
    } else {
      const error: any = new Error('Error: No delete');
      error.status = 404;
      throw error;
    }
  }
}

export default CityService;