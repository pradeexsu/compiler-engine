import { Router } from 'express'
import { getCode, saveCode } from '../services/redisService/index.js'
export const cache = Router()

cache.get('/:id', async (request, response) => {
  const { id } = request.params
  const res = await getCode({ id })
  response.json(res)
})

cache.post('/', async (request, response) => {

  const { code, lang } = request.body
  const res = await saveCode({ code, lang })
  response.json(res)
})
