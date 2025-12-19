import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import App from './app'
import config from './ormconfig'
import UserRout from './routes/user.rout'
import TaskRout from './routes/task.rout'
import CityRout from './routes/city.rout'
import AuthRout from './routes/auth.rout'

console.log('Starting server initialization...')

// Wrap in a function to ensure we catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
})

;(async () => {
  try {
    console.log('Connecting to database...')
    // Explicitly await connection
    await createConnection(config)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Error while connecting to the database', error)
    process.exit(1)
  }

  try {
    console.log('Initializing app...')
    const app = new App(
      [new AuthRout(), new UserRout(), new TaskRout(), new CityRout()],
      5001, // Changed port to 5001 to avoid conflict with AirPlay Receiver (port 5000)
    )

    console.log('Starting listener on port 5001...')
    app.listen()
    console.log('Listener started (sync call)')
  } catch (e) {
    console.error('Error initializing app:', e)
  }
})()
