import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { routes } from '@router'

configDotenv()
const port = process.env.PORT || 3001

const app = express()
app.use(express.json()).use(cors())
app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`Compiler engine up and running at port: ${port}`)
})
