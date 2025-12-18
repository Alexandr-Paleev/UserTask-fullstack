import 'dotenv/config';
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import config from './ormconfig';
import City from './models/city.entity';
import User from './models/user.entity';
import Task from './models/task.entity';

(async () => {
  try {
    const connection = await createConnection(config);
    console.log('Database connected for seeding...');

    const cityRepository = getRepository(City);
    const userRepository = getRepository(User);
    const taskRepository = getRepository(Task);

    // 1. Seed Cities
    const cityCount = await cityRepository.count();
    let cities: City[] = [];
    
    if (cityCount === 0) {
      console.log('Seeding cities...');
      const cityNames = ['Kharkov', 'Kiev', 'Lviv', 'Odessa', 'Dnipro', 'New York', 'London'];
      
      for (const name of cityNames) {
        const city = cityRepository.create({ title: name });
        await cityRepository.save(city);
        cities.push(city);
      }
      console.log('Cities seeded.');
    } else {
      console.log('Cities already exist, skipping.');
      cities = await cityRepository.find();
    }

    // 2. Seed Users
    const userCount = await userRepository.count();
    let user: User | undefined;

    if (userCount === 0 && cities.length > 0) {
      console.log('Seeding users...');
      user = userRepository.create({
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Main St',
        phone: '555-0123',
        city: cities[0] // Link to first city
      });
      await userRepository.save(user);
      console.log('User seeded.');
    } else {
      console.log('Users already exist, skipping.');
      user = (await userRepository.find())[0];
    }

    // 3. Seed Tasks
    const taskCount = await taskRepository.count();
    if (taskCount === 0 && user) {
      console.log('Seeding tasks...');
      const task = taskRepository.create({
        title: 'Initial Setup',
        description: 'Complete the project setup',
        address: 'Office',
        startTime: '09:00',
        endTime: '17:00',
        user: user // Link to user
      });
      await taskRepository.save(task);
      console.log('Task seeded.');
    } else {
      console.log('Tasks already exist, skipping.');
    }

    console.log('Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();




