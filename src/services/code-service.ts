import redis from 'redis'
import { PrismaClient } from '@prisma/client'

import { SaveCodeRequest, CodeData } from '../utils/typings.js'
import { log } from 'console'

const prismaClient = new PrismaClient()
prismaClient
  .$connect()
  .then(() => {
    console.log('Prisma Connection Success!!')
  })
  .catch((err) => {
    log(process.env.DATABASE_URL)
    log(err)

    console.log('Prisma Connection Failed!!')
  })

const redisClient = redis.createClient({
  url: process.env.REDIS_HOST_URL,
  username: process.env.REDIS_USER_NAME,
  password: process.env.REDIS_PASSWORD,
})
redisClient
  .connect()
  .then(() => {
    console.log('Redis Connection Successful!!')
  })
  .catch((err) => {
    log(err)
    console.log('Redis Connection Failed!!')
  })

export const saveCode = async ({
  lang,
  code,
}: SaveCodeRequest): Promise<CodeData | null> => {
  return await prismaClient.code_base.create({
    data: {
      lang,
      code,
    },
  })
}

export const getCode = async ({
  id,
}: {
  id: number
}): Promise<CodeData | null> => {
  return await prismaClient.code_base.findUnique({
    where: {
      id,
    },
  })
}
