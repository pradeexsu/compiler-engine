import { Request, Response, Router } from 'express'
import { executorController } from '@controller/executor-controller.ts'
import { fetchCode, uploadCode } from '@controller/code-controller.ts'

export const routes = Router()

routes
  .get('/ping', (req: Request, res: Response) => {
    res.send('pong')
  })
  .post('/execute', executorController)
  .get('/save/:id', fetchCode)
  .post('/save', uploadCode)
