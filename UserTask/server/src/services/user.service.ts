import * as express from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user.entity';

class UserService {
  private userRepository;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public createUser = async (userData) => {
    const result = await this.userRepository.find({where: { firstname: userData.firstname}})
    if (result[0]) {
      return "This user already exists!"
    } else {
      const newUser = this.userRepository.create(userData);
      await this.userRepository.save(newUser);
      return newUser;
    }
  }

  public getAllUsers = async () => {
    const users = await this.userRepository.find();
    return users;
  }

  public getAllUserCity = async (id) => {
    const user = await this.userRepository.find({where: { city_: id}});
    return user;
  }
 
  public deleteUser = async (id) => {
    const deleteResponse = await this.userRepository.delete(id);
    if (deleteResponse.affected !== 0) {
      return 'Ok';
    } else {
      return `User with id = ${id}: not found.`;
    }
  }
}

export default UserService;