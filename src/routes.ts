import { Request, Response, Router } from 'express'
import { executorController } from './controller/executor-controller.js'
import { fetchCode, uploadCode } from './controller/code-controller.js'

export const router = Router()

router
  .get('/ping', (req: Request, res: Response) => {
    res.send('pong')
  })
  .post('/execute', executorController)
  .get('/save/:id', fetchCode)
  .post('/save', uploadCode)
