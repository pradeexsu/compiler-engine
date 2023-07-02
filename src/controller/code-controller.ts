import { Request, Response, Router } from 'express'
import { getCode, saveCode } from '../services/code-service.js'
export const cache = Router()

export const fetchCode = async (request: Request, response: Response) => {
  const id = +request.params.id
  if (isNaN(id))
    response.json({
      message: 'bad request',
    })

  const res = await getCode({ id })
  response.json(res)
}

export const uploadCode = async (request: Request, response: Response) => {
  const { code, lang } = request.body
  const res = await saveCode({ code, lang })
  response.json(res)
}
