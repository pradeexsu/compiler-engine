import { Request, Response, Router } from 'express'
import { Builder } from 'builder-pattern'
import _ from 'lodash'

import { getCode, saveCode } from '../services/code-service.js'
import { ApiResponse, CodeData } from '../utils/typings.js'
import { isValidLanguage } from '../utils/validator.js'

export const cache = Router()

export const fetchCode = async (request: Request, response: Response) => {
  const builder = Builder<ApiResponse<CodeData>>()
  try {
    const id = +request.params.id
    if (isNaN(id)) {
      builder.success(false).errorMessage('Bad request! 🙅🏻')
    } else {
      const data = await getCode({ id })
      if (data !== null) {
        builder.data(data).success(true)
      } else {
        builder.success(false).errorMessage(`code not found ${id} 🫙`)
      }
    }
    response.json(builder.build())
  } catch (err) {
    builder.success(false).errorMessage(`500 Internal Server Error 😶`)
    response.json(builder.build())
  }
}

export const uploadCode = async (request: Request, response: Response) => {
  const builder = Builder<ApiResponse<CodeData>>()
  try {
    const { code, lang } = request.body
    if (_.isEmpty(code) || !isValidLanguage(lang)) {
      builder.success(false).errorMessage('Bad request! 🙅🏻')
    } else {
      const data = await saveCode({ code, lang })
      if (data !== null) {
        builder.data(data).success(true)
      } else {
        builder.errorMessage(`Failed to save code 🎃`).success(false)
      }
    }
    response.json(builder.build())
  } catch (err) {
    builder.success(false).errorMessage(`500 Internal Server Error 😶`)
    response.json(builder.build())
  }
}
