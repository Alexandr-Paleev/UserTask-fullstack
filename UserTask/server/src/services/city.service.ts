import { getRepository } from 'typeorm'
import City from '../models/city.entity'

class CityService {
  private cityRepository

  constructor() {
    this.cityRepository = getRepository(City)
  }

  public ensureSeeded = async () => {
    const defaultCityTitles = [
      'London',
      'Paris',
      'Berlin',
      'Rome',
      'Madrid',
      'Vienna',
      'Prague',
      'Warsaw',
      'Amsterdam',
      'Brussels',
      'Kyiv',
    ]

    const existing = await this.cityRepository.find()
    const existingTitles = new Set(existing.map((c) => c.title))
    const missingTitles = defaultCityTitles.filter((title) => !existingTitles.has(title))
    if (missingTitles.length === 0) return

    const cities = missingTitles.map((title) => this.cityRepository.create({ title }))
    await this.cityRepository.save(cities)
  }

  public createCity = async (cityData) => {
    const newCity = this.cityRepository.create(cityData)
    await this.cityRepository.save(newCity)
    return newCity
  }

  public getAllCitys = async () => {
    await this.ensureSeeded()
    const citys = await this.cityRepository.find()
    return citys
  }

  public deleteCity = async (id) => {
    const deleteResponse = await this.cityRepository.delete(id)
    if (deleteResponse.affected !== 0) {
      return 'Ok'
    } else {
      const error: any = new Error('Error: No delete')
      error.status = 404
      throw error
    }
  }
}

export default CityService
