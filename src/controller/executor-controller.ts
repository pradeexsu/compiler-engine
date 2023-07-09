import { Request, Response } from 'express'
import { Builder } from 'builder-pattern'
import _ from 'lodash'

import { executor } from '../services/executor-service.js'
import { ApiResponse, ExecutOutputType } from '../utils/typings.js'
import { isValidLanguage } from '../utils/validator.js'

export const executorController = async (
  request: Request,
  response: Response,
) => {
  const builder = Builder<ApiResponse<ExecutOutputType>>()
  try {
    const { code, input, lang } = request.body
    if (_.isEmpty(code) || !isValidLanguage(lang)) {
      builder.success(false).errorMessage('Bad request! 🙅🏻')
    } else {
      const data = await executor({ code, lang, input })
      builder.data(data).success(true)
    }
    response.json(builder.build())
  } catch (err) {
    builder
      .errorMessage('Some Truble in Executing your Code! 😶')
      .success(false)
    response.json(builder.build())
  }
}
