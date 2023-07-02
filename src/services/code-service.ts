import redis from 'redis'
import { PrismaClient } from '@prisma/client'
import { log } from 'console'

const prismaClient = new PrismaClient()

prismaClient
  .$connect()
  .then(() => {
    console.log('Prisma Connection Success!!')
  })
  .catch(() => {
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
    console.log('Redis Connection Failed!!')
  })

export const saveCode = async ({ lang, code }) => {
  log(lang, code)
  const savedCode = await prismaClient.code_base.create({
    data: {
      lang,
      code,
    },
  })
  log(savedCode)

  return {
    data: savedCode,
    message: 'code saved successfully',
  }
}

export const getCode = async ({ id }) => {
  const code = prismaClient.code_base.findUnique({
    where: {
      id,
    },
  })

  // const result = await redisClient.get(id)
  // const { code, lang } = JSON.parse(result)
  return {
    ...code,
    message: 'code fetched successfully',
  }
}
