import redis from 'redis'
import { v4 as uuid } from 'uuid'

const client = redis.createClient({
  url: 'redis://localhost/',
  username: 'default',
  password: 'password',
})

client
  .connect()
  .then(() => {
    console.log('Redis Connection Successful!!')
  })
  .catch((err) => {
    console.log('Redis Connection Failed!!')
  })

export const saveCode = async ({ lang, code }) => {
  const id = uuid()
  await client.set(
    id,
    JSON.stringify({
      code,
      lang,
    }),
  )
  return {
    id: id,
    message: 'code saved successfully',
  }
}

export const getCode = async ({ id }) => {
  const result = await client.get(id)
  // const { code, lang } = JSON.parse(result)
  return {
    id,
    ...JSON.parse(result),
    message: 'code fetched successfully',
  }
}
