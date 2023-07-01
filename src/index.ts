import express from 'express'
import { configDotenv } from 'dotenv'
import { executer } from './routes/executor.js'

import { cache } from './routes/store.js'

import cors from 'cors'

configDotenv()
const port = process.env.PORT || 3001

const app = express()
app.use(express.json()).use(cors())

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.use('/execute', executer)
app.use('/save', cache)

app.listen(port, () => {
  console.log(`Compiler engine up and running at port: ${port}`)
})
