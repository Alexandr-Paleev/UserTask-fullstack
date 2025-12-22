import { getRepository } from 'typeorm'
import User from '../models/user.entity'
import City from '../models/city.entity'

class UserService {
  private userRepository
  private cityRepository

  constructor() {
    this.userRepository = getRepository(User)
    this.cityRepository = getRepository(City)
  }

  public createUser = async (userData, accountId: number) => {
    // 1. Handle city find or create
    let city = null
    if (userData.city) {
      if (userData.city.id) {
        city = await this.cityRepository.findOne(userData.city.id)
      } else if (userData.city.title) {
        city = await this.cityRepository.findOne({ where: { title: userData.city.title } })
        if (!city) {
          city = this.cityRepository.create({ title: userData.city.title })
          await this.cityRepository.save(city)
        }
      }
    }

    const existingUserByPhone = await this.userRepository.findOne({
      where: { phone: userData.phone },
    })
    if (existingUserByPhone) {
      const error: any = new Error('User with this phone number already exists!')
      error.status = 409
      throw error
    }

    const existingUserByName = await this.userRepository.findOne({
      where: {
        firstname: userData.firstname,
        lastname: userData.lastname,
      },
    })
    if (existingUserByName) {
      const error: any = new Error('User with this name already exists!')
      error.status = 409
      throw error
    }

    const newUser = this.userRepository.create({
      ...userData,
      city: city, // Use the resolved city
      ownerId: accountId,
      isDemo: false,
    })
    await this.userRepository.save(newUser)
    return newUser
  }

  public getAllUsers = async (accountId: number) => {
    const users = await this.userRepository.find({
      where: [{ ownerId: accountId }, { isDemo: true }],
      relations: ['city', 'tasks'],
    })
    return users
  }

  public getAllUserCity = async (cityId, accountId: number) => {
    const users = await this.userRepository.find({
      where: [
        { city: cityId, ownerId: accountId },
        { city: cityId, isDemo: true },
      ],
      relations: ['city', 'tasks'],
    })
    return users
  }

  public deleteUser = async (id, accountId: number) => {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      const error: any = new Error(`User with id = ${id}: not found.`)
      error.status = 404
      throw error
    }

    if (user.isDemo) {
      const error: any = new Error('Demo records cannot be deleted.')
      error.status = 403
      throw error
    }

    if (user.ownerId !== accountId) {
      const error: any = new Error('Forbidden')
      error.status = 403
      throw error
    }

    const deleteResponse = await this.userRepository.delete(id)
    if (deleteResponse.affected !== 0) {
      return 'Ok'
    } else {
      const error: any = new Error(`User with id = ${id}: not found.`)
      error.status = 404
      throw error
    }
  }
}

export default UserService
