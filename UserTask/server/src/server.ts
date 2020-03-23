import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import config from './ormconfig';
import UserRout from './routes/user.rout';
import TaskRout from './routes/task.rout';
// import UserTaskRout from './routes/user-task.rout';
import CityRout from './routes/city.rout';
 
(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App(
    [
      new UserRout(), 
      new TaskRout(),
      // new UserTaskRout(),
      new CityRout()
    ],
    5000
  );
  app.listen();
})();