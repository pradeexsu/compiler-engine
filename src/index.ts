import express from 'express'
import { configDotenv } from 'dotenv'
import { executer } from './routes/index.js'

configDotenv()
const port = process.env.PORT || 3001

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hi from engine')
})

app.use('/execute', executer)

app.listen(port, () => {
  console.log(`Compiler engine up and running at port: ${port}`)
})
