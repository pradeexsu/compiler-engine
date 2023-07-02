import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { router } from './routes.js'

configDotenv()
const port = process.env.PORT || 3001

const app = express()
app.use(express.json()).use(cors())
app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Compiler engine up and running at port: ${port}`)
})
