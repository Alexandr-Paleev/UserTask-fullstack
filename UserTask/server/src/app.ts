import express from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'

class App {
  public app: express.Application
  public port = process.env.PORT || 5001

  constructor(controllers, port) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())

    this.app.use(function (req, res, next) {
      // Allow configuring origin for local/dev/docker without code changes
      const origin = process.env.CORS_ORIGIN || 'http://localhost:3000'
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
      next()
    })
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }
}

export default App
