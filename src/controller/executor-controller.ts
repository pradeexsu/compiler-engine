import { executor } from '../services/executor-service.js'

export const executorController = async (request, response) => {
  const { body } = request
  const { code, input, lang } = body
  const result = await executor({ code, lang, input })
  response.json({
    ...result,
  })
}
