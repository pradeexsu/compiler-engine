import { Router } from 'express'
import {
  cppExecutor,
  javaExecutor,
  nodeExecutor,
  pyExecutor,
} from '../services/executerService/index.js'

export const executer = Router().put('/', async (request, response) => {
  const { body } = request
  const { code, input, lang } = body
  let result
  switch (lang) {
    case 'cpp':
    case 'c++':
      result = await cppExecutor({ code, input })
      break
    case 'java':
      result = await javaExecutor({ code, input })
      break
    case 'python':
      result = await pyExecutor({ code, input })
      break
    case 'node':
      result = await nodeExecutor({ code, input })
      break
    default:
      result = { message: 'lang not supported!' }
  }
  response.json({
    ...result,
  })
})
