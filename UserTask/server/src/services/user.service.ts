import * as express from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user.entity';

class UserService {
  private userRepository;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public createUser = async (userData) => {
    const existingUserByPhone = await this.userRepository.findOne({where: { phone: userData.phone}});
    if (existingUserByPhone) {
      const error: any = new Error("User with this phone number already exists!");
      error.status = 409;
      throw error;
    }
    
    const existingUserByName = await this.userRepository.findOne({
      where: { 
        firstname: userData.firstname,
        lastname: userData.lastname
      }
    });
    if (existingUserByName) {
      const error: any = new Error("User with this name already exists!");
      error.status = 409;
      throw error;
    }
    
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  public getAllUsers = async () => {
    const users = await this.userRepository.find({ relations: ["city", "tasks"] });
    return users;
  }

  public getAllUserCity = async (id) => {
    const user = await this.userRepository.find({where: { city: id}});
    return user;
  }
 
  public deleteUser = async (id) => {
    const deleteResponse = await this.userRepository.delete(id);
    if (deleteResponse.affected !== 0) {
      return 'Ok';
    } else {
      const error: any = new Error(`User with id = ${id}: not found.`);
      error.status = 404;
      throw error;
    }
  }
}

export default UserService;