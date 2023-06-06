import { Router } from 'express'

export const executer = Router().put('/', (request, response, next) => {
  const { body } = request
  const { code, input, lang } = body

  response.json(body)
})
